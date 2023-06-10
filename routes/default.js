const router = require('express').Router()//  server accept route request
const Auction =require('../models/bid');
const Item = require("../models/items");
const Deletedauction = require('../models/deletedauctions')
const DeletedAuction = require('../models/deletedauctions')
const auth =require("./auth")// connect to auction model and send CRUD (create, retrieve, update, delete) operations to database
// route to get specific auction available
const jwt = require('jsonwebtoken')//library  for authenticate 
//function to authenticate the admin and protect the routes
function authenticateAdminToken(req, res, next) {
    const token = req.cookies.jwt;// get cookie
//check token is empty
    if (token == null) {
        return res.status(401).render('login',{data:"unaothorized", title:"login"}); // Unauthorized)
    } 
// decode the cookie
  jwt.verify(token, '09f26e402586e2faa8da4c98a35f1b20d6b033c60', (err, user) => {
    console.log(err)

    if (err) return res.sendStatus(403)
// read cookie data
    req.user = user;
    // check if cookie data is admin
    if(req.user.name !== "admin"){
return res.status(401).render('login',{data:"unaothorized", title:"login"})
    }
    // log cookie username
    console.log(req.user.name)
    // continue to next function
    next()
  })
};
// route to get auctions available
router.get('/',auth, async (req, res) => {
  try {
    //get auctions from a database 
    const auctions = await Auction.find();
    if(!auctions){
      return res.render('admin',{data:"auction not found", title:"auction"})
    }
    if(auctions.length === 0){
      console.log(auctions)
      return res.render('admin', {data:"auction not found", title:"bids"});
    }
    //response with all auctions
    const btnvalue='auction'
    res.render('admin', {data:auctions,btnvalue:btnvalue, title:"auctions"});
  } catch (err) {
    console.error(err);
    res.status(500).send('Internal server error');
  }
});
// route to get specific auctions
router.get('/auction',auth, async (req, res) => {
  try {
    const Requestname=req.query.name
    //get auctions from a database 
    const auction = await Auction.find({name:Requestname});
    console.log(auction)
    if(!auction ||( auction.length==0)){
      return res.render('admin',{data:"auction not found", title:"auction"})
    }
    //response with all auctions
    const btnvalue='auction'
    res.render('admin', {data:auction, btnvalue:btnvalue,title:"auctions"});
  } catch (err) {
    console.error(err);
    res.status(500).send('Internal server error');
  }
});
// route to get bids available
router.get('/bids',authenticateAdminToken, async (req, res) => {
  try {
    //get auctions from a database 
    const bids = await Auction.find();
    //response with all auctions
    const btnvalue='bid'
    res.render('admin', {data:bids, btnvalue:btnvalue,title:" My bids",});
  } catch (err) {
    console.error(err);
    res.status(500).send('Internal server error');
  }
});
//to route form request
router.get('/FormData', authenticateAdminToken, async (req, res)=>{
  console.log(req.query)
  console.log(req.query.action);
  let uri = req.query.action
  const items= req.query
  res.render('adminForm' ,{data:uri, items:items, title:'form auction'});
})
// insert auction route to place a bid post request
router.post('/auction',authenticateAdminToken, async (req, res) => {
  try {
    console.log(req.body)
    //check  auction from database
    const auction = await Auction.findOne({name:req.body.name});
    //if auction not true unavailable
    if (auction) {
      return res.render('admin', {data:auction, title:"bids"});
    } console.log(auction)
// insert auction to database
    await Auction.create({name:req.body.name,
        description:req.body.description,
        startingBid:req.body.price,
        currentBid:req.body.startingBid,
        price:req.body.price,
        image:req.body.image,});
   //send a response for success with 200 success code
    res.redirect("/admin")
  } catch (err) {// catch error and log error without stoping the server
    console.error(err);
    res.status(500).send('Internal server error');//send a response for error with 500 server error code
  }
});// route for update auction
router.post('/update',authenticateAdminToken, async (req, res) => {
  try {
    console.log(req.body)
    //check the auction from database
    const auction = await Auction.findOne({name:req.body.name});

    // check if auction is unavailable
    if (!auction) {
      return res.render('admin', {data:"auction not found", title:"auctions"});// response message
    }
    // update the auction
      const newAuction=await Auction.findOneAndUpdate({name:req.body.name}, {startingBid:req.body.price,description:req.body.description, image:req.body.image}, { new: true });
      console.log(newAuction)
     // response
     const btnvalue='bid'
    res.redirect('/admin/');
  } catch (err) {
    console.error(err);
    res.status(500).send('Internal server error');
  }
});

// delete auctions
router.post('/delete', auth, async (req, res)=>{
  try{ console.log()
    //check the auction
  const bids = await Auction.findOne({name:req.body.name});
 console.log(bids)
  // update the auction name
 const deletedauctions = new DeletedAuction({
  name:req.body.name,
  username:bids.username,
  currentBid:bids.currentBid,
  startindBid:bids.startingBid,
  description:req.body.description
 })
 await deletedauctions.save();
 await Auction.deleteOne({name:bids.name});
  //response with updated  auction list
  res.redirect('/admin/');
}
 catch (err) {
  console.error(err);
  res.status(500).send('Internal server error');
}
});
//export the function as internal module
module.exports = router
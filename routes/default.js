const router = require('express').Router()//  server accept route request
const Auction =require('../models/bid')
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
router.get('/FormData', authenticateAdminToken, async (req, res)=>{
    console.log(req.query)
    console.log(req.query.action);
    let uri = req.query.action
    res.render('adminForm' ,{data:uri, title:'form auction'});
  })
// route to get specific auctions
router.get('/auction',auth, async (req, res) => {
  try {
    const Requestname=req.query.name
    //get auctions from a database 
    const auction = await Auction.findOne({name:Requestname});
    if(!auction){
      return res.render('admin',{data: " auction not found", title:"auction"})
    }
    //response with all auctions
    res.render('admin', {data:auction, title:"auctions"});
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
    res.render('admin', {data:bids, title:" My bids"});
  } catch (err) {
    console.error(err);
    res.status(500).send('Internal server error');
  }
});
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
        startingBid:req.body.startingBid,
        currentBid:req.body.startingBid,
        price:req.body.price,
        image:req.body.image,});
   //send a response for success with 200 success code
    res.redirect("/admin")
  } catch (err) {// catch error and log error without stoping the server
    console.error(err);
    res.status(500).send('Internal server error');//send a response for error with 500 server error code
  }
});// route for payment
router.post('/update',authenticateAdminToken, async (req, res) => {
  try {
    console.log(req.body)
    //check the auction from database
    const auction = await Auction.find({name:req.body.name});

    // provide  message for unavaiable auction
    console.log(auction + "welcome to update")
    // check if auction is unavailable
    if (!auction) {
      return res.render('admin', {data:"auction not found", title:"auctions"});// response message
    }
    //find the right bid for the user
    const findUsername = username => auction.find(a => a.username === username)
    const userBid=findUsername(req.body.name)
    //provide username in a variable
    console.log(auction.username)
    // update the auction
       Auction.updateOne({username:req.body.name}, req.body)
     // response
    res.render('admin', {data:userBid, title:"auction update", });
  } catch (err) {
    console.error(err);
    res.status(500).send('Internal server error');
  }
});
// route to get auctions available
router.get('/',auth, async (req, res) => {
  try {
    //get auctions from a database 
    const auctions = await Auction.find();
    //response with all auctions
    res.render('admin', {data:auctions, title:"auctions"});
  } catch (err) {
    console.error(err);
    res.status(500).send('Internal server error');
  }
});
// delete auctions
router.post('/delete', auth, async (req, res)=>{
  try{ console.log("hello")
    //check the auction
  const bids = await Auction.find({username:req.user.name});
 
  //find username for bid 
  const findUsername = username => bids.find(a => a.username === username)
  const userBid=findUsername(req.user.name)
  //add deleted string to represent deleted , the auction is only delete manually from database just for record keeping of complaints 
  const deletedName= ('deleted '+req.body.name)
 // update the auction name
 
  Auction.findOneAndDelete({name:req.body.name}, {name:deletedName}, )
  //response with updated  auction
  res.render('admin', {data:userBid, title:"delete Auction"});
}
 catch (err) {
  console.error(err);
  res.status(500).send('Internal server error');
}
});
//export the function as internal module
module.exports = router
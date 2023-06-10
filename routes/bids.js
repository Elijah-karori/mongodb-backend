const router = require('express').Router()//  server accept route request
const Auction =require('../models/bid')
const auth =require("./auth")// connect to auction model and send CRUD (create, retrieve, update, delete) operations to database
// route to get specific auction available
router.get('/auction',auth, async (req, res) => {
  try {
    const Requestname=req.query.name
    //get auctions from a database 
    const auction = await Auction.findOne({name:Requestname});
    if(!auction){
      return res.render('auctions',{data: "auction not found", title:"auction"})
    }
    //response with all auctions
    res.render('auctions', {data:auction, title:"auctions"});
  } catch (err) {
    console.error(err);
    res.status(500).send('Internal server error');
  }
});
// route to get bids available
router.get('/bids',auth, async (req, res) => {
  try {
    //get auctions from a database 
    console.log(req.user.name)
    const bids = await Auction.find({username:req.user.name});
    console.log(bids)

    if(bids.length === 0){
      console.log(bids)
      return res.render('auctions', {data:"auction not found", title:"bids"});
    }
    //response with all auctions
    res.render('auctions', {data:bids, title:" My bids"});
  } catch (err) {
    console.error(err);
    res.status(500).send('Internal server error');
  }
});
// biding route to place a bid post request
router.post('/bid',auth, async (req, res) => {
  try {
    console.log(req.body)
    //check  auction from database
    const auction = await Auction.findOne({name:req.body.name});
    //if auction not true unavailable
    if (!auction) {
      return res.render('auctions', {data:" auction not found", title:"bids"});
    }console.log(auction)
    // auction avaiable and check if current bid is greater than the user bid
    if (req.body.bidAmount <= auction.currentBid) {
      return res.render('auctions', {data:"bid heigher than current", title:"bids"});
    }// bid is higher than current bid and update the user bid as the current bid
   auction.currentBid = req.body.bidAmount; 
   console.log(auction)
   // update auction to database
    await Auction.updateOne({name:auction.name}, { currentBid: req.body.bidAmount, username:req.user.name});
   //send a response for success with 200 success code
    res.status(200).render('auctions', {data:auction, title:"bids"});
  } catch (err) {// catch error and log error without stoping the server
    console.error(err);
    res.status(500).send('Internal server error');//send a response for error with 500 server error code
  }
});// route for payment

router.post('/charge',auth, async (req, res) => {
  try {
    //check the auction from database
    const auction = await Auction.find({username:req.user.name});

    // provide  message for unavaiable auction
    console.log(auction)
    // check if auction is unavailable
    if (!auction) {
      return res.render('auctions', {data:"auction not found", title:"bids"});// response message
    }
   
    
    //provide username in a variable
    const winnerName=req.user.name 
      //find the right bid for the user 
    const wins =auction.filter(win=>win.username===winnerName)
    console.log(wins)
     
   return res.render('payment', {data:wins, message:'Payment with MPESA send money (07 XXXXXXXX)or pochi la biashara. ', title:"Mpesa payment",});
   
  } catch (err) {
    console.error(err);
    res.status(500).send('Internal server error');
  }
});
// route to get auctions available
router.get('/auctions',auth, async (req, res) => {
  try {
    //get auctions from a database 
    const auctions = await Auction.find();

    if (auctions.length===0) {
      return res.render('auctions', {data:"auction not found", title:"bids"});// response message
    }
    //response with all auctions
    res.render('auctions', {data:auctions, title:"auctions"});
  } catch (err) {
    console.error(err);
    res.status(500).send('Internal server error');
  }
});
router.get('/charge', auth, async (req, res)=>{
  try{
    
  const bids = await Auction.find({username:req.user.name});
  console.log(bids)
  //const findUsername = username => bids.find(a => a.username === username)
  //const userBid=findUsername(req.user.name)
  
  //response with all auctions
  res.render('charge', {data:bids, title:"charges",message:"mpesa 07XXXXXXXXX or pochi la biashara"});
}
 catch (err) {
  console.error(err);
  res.status(500).send('Internal server error');
}
});
//export the function as internal module
module.exports = router
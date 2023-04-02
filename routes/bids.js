const router = require('express').Router()//  server accept route request
const Auction =require('../models/bid')// connect to auction model and send CRUD (create, retrieve, update, delete) operations to database

// biding route to place a bid post request
router.post('/bid', async (req, res) => {
  try {
    //check if auction is available
    const auction = await Auction.findOne({name:req.body.name});
    //if auction not true unavailable
    if (!auction) {
      return res.status(404).send('Auction not found');
    }console.log(auction)
    // auction avaiable and check if current bid is greater than the user bid
    if (req.body.bidAmount <= auction.currentBid) {
      return res.status(400).send('Bid amount must be higher than current bid');
    }// bid is higher than current bid and update the user bid as the current bid
   auction.currentBid = req.body.bidAmount; 
   console.log(auction)
   // update to database
    await Auction.updateOne({name:auction.name}, { currentBid: req.body.bidAmount, username:req.body.username});
   //send a response for success with 200 success code
    res.status(200).send('Bid successful');
  } catch (err) {// catch error and log error without stoping the server
    console.error(err);
    res.status(500).send('Internal server error');//send a response for error with 500 server error code
  }
});// route for payment

router.post('/charge', async (req, res) => {
  try {
    //check the auction if availble
    const auction = await Auction.findOne({name:req.body.name});
    // provide  message for unavaiable auction
    console.log(auction)
    if (!auction) {
      return res.status(404).send('Auction not found');
    }
    //provide username in a variable
    const winnerName=req.body.username
    //check if the winner username is the same as the user username
    if(auction.username != winnerName || (null || undefined )){
      return res.status(404).send('username not found');// response for username not the same as winner
    }
    // provide user payment amount
     const amount = auction.currentBid; 
     //rovide payment options response
    res.status(200).send('Payment with MPESA send money (07 XXXXXXXX)or pochi la biashara. Amount: '+ amount);
  } catch (err) {
    console.error(err);
    res.status(500).send('Internal server error');
  }
});
// route to get auctions available
router.get('/auctions', async (req, res) => {
  try {
    //get auctions from a database 
    const auctions = await Auction.find();
    //response with all auctions
    res.status(200).json(auctions);
  } catch (err) {
    console.error(err);
    res.status(500).send('Internal server error');
  }
});
//export the function as internal module
module.exports = router
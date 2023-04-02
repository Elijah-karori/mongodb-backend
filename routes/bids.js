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
   
    res.status(200).send('Bid successful');
  } catch (err) {
    console.error(err);
    res.status(500).send('Internal server error');
  }
});

router.post('/charge', async (req, res) => {
  try {
    const auction = await Auction.findOne({name:req.body.name});
    console.log(auction)
    if (!auction) {
      return res.status(404).send('Auction not found');
    }
    const winnerName=req.body.username
    if(auction.username != winnerName || (null || undefined )){
      return res.status(404).send('username not found');
    }
     const amount = auction.currentBid; 
    res.status(200).send('Payment with MPESA send money (07 XXXXXXXX)or pochi la biashara. Amount: '+ amount);
  } catch (err) {
    console.error(err);
    res.status(500).send('Internal server error');
  }
});

router.get('/auctions', async (req, res) => {
  try {
    const auctions = await Auction.find();
    res.status(200).json(auctions);
  } catch (err) {
    console.error(err);
    res.status(500).send('Internal server error');
  }
});

module.exports = router
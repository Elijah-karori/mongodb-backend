const router = require('express').Router()
const mongoose =require('mongoose')
const Auction =require('../models/bid')
const dbConnect =async ()=>{
    await mongoose.createConnection("mongodb+srv://elijah:elijah@cluster0.oyewpgw.mongodb.net/?retryWrites=true&w=majorityauction", )
    console.log(mongoose.connection.db)
}
dbConnect()



router.post('/bid', async (req, res) => {
  try {
    const auction = await Auction.find({name:req.body.name});
    if (!auction) {
      return res.status(404).send('Auction not found');
    }
    if (req.body.bidAmount <= auction[0].currentBid) {
      return res.status(400).send('Bid amount must be higher than current bid');
    }
   auction.currentBid = req.body.bidAmount; 
   console.log(auction[0])
     await Auction.updateOne({name:auction[0].name}, { currentBid: req.body.bidAmount});
   
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
   
    await Auction.findOneAndUpdate({name:auction.name}, {
      currentBid: auction.startingBid,
    });
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
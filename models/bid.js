const mongoose =require('mongoose')
const auctionSchema = new mongoose.Schema({
    name: String,
    description: String,
    startingBid: Number,
    currentBid: Number,
    image: String,
  });
  
  const Auction = mongoose.model('Auction', auctionSchema);
module.exports= Auction
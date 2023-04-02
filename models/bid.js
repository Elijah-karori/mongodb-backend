const mongoose =require('mongoose')//library to communicate with database
//create a data schema to give parameters for CRUD operations, database enteries
const auctionSchema = new mongoose.Schema({
    name: String,//field data type
    description: String,//field data type
    startingBid: Number,//field data type
    currentBid: Number,//field data type
    image: String,//field data type
    username: String,//field data type
  });
  
  const Auction = mongoose.model('Auction', auctionSchema);// provide name to schema 
module.exports= Auction//export as module
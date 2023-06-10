const mongoose =require('mongoose')//library to communicate with database
//create a data schema to give parameters for CRUD operations, database enteries
const deletedauctionSchema = new mongoose.Schema({
    name: String,//field data type
    description: String,//field data type
    startingBid: Number,//field data type
    currentBid: Number,//field data type
    image: String,//field data type
    username: String,//field data type
  });
  
  const Deletedauction = mongoose.model('DeletedAuction', deletedauctionSchema);// provide name to schema 
module.exports= Deletedauction//export as module
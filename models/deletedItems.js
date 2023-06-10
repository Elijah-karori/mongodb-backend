const  mongoose  = require("mongoose");
const{ Schema }= mongoose
const DeleteditemSchema = new Schema({
description: String,
  image: String,
    name: String,
    price: Number,
    seller:String,
    added: { type: Date, default: Date.now },
  });

  const Deleteditem =mongoose.model('Deleteditem', DeleteditemSchema);
  

  module.exports=Deleteditem
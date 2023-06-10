const  mongoose  = require("mongoose");
const{ Schema }= mongoose
const itemSchema = new Schema({
    description: String,
  image: String,
    name: {
      type: String,
      required: true,
      unique: false
    },
    price: {
        type: Number,
        required: true,
        unique:false
      },
      seller:String,
      
      added: { type: Date, default: Date.now },
  });

  const Item =mongoose.model('item', itemSchema);
  

  module.exports=Item
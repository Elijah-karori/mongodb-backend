const  mongoose  = require("mongoose");// library for CRUD operations

const UserSchema = new mongoose.Schema({
    name: String,
    email: {
      type: String,
      unique: true,
    },
    password: {
        type: String,
      },
      accessAs:{type:String,
        required:false},
      joined: { type: Date, default: Date.now },
  });

  const User =mongoose.model('User', UserSchema);//link the model to the function

  module.exports=User
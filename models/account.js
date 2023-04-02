const  mongoose  = require("mongoose");

const UserSchema = new mongoose.Schema({
    name: String,
    email: {
      type: String,
      unique: true,
    },
    password: {
        type: String,
      },
      joined: { type: Date, default: Date.now },
  });

  const User =mongoose.model('User', UserSchema);//link the model to the function

  module.exports=User
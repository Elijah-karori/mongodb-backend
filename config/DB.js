const mongoose =require("mongoose"); //import the ODM library to connect to the MONGO DATABASE

const dbConnect =async ()=>{
    await mongoose.connect("mongodb://127.0.0.1:27017/ ",)
    console.log(mongoose.connection.host)
}
module.exports= dbConnect;
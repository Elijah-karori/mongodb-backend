const mongoose =require("mongoose"); //import the ODM library to connect to the MONGO DATABASE

const dbConnect =async ()=>{
    await mongoose.connect(process.env.MONGO_URI ,)
    console.log(mongoose.connection.host)
}
module.exports= dbConnect;
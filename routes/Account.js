const Router= require('express').Router();
const User = require('../models/account')
const jwt = require("jsonwebtoken");
const bcrypt=require('bcrypt')

Router.get('/',(req,res)=>{
    const id =req.body.id;
   res.status(404).json({"token": "hello"});         // Only this runs.
      }
);
Router.post('/login',async(req,res)=>{
    try {
        const user = await User.findOne({ email: req.body.email });//check user is available
        console.log(user);
        if (user) {
          //if password is not entered or undefined
            if(!req.body.password || !user.password){
                return res.send('require password')
            }
          //verify password using bcrypt
          const cmp = await bcrypt.compare(req.body.password, user.password);
          console.log(cmp)

          if (cmp) {
            //   ..... further code to maintain authentication like jwt or sessions
           return res.json({data:"Auth Successful"});
          } else {
            return res.send("Wrong email or password.");
          }
        } else {
         return  res.send("Wrong username or password.");
        }
        //catch error in server 
      } catch (error) {
        console.log(error);
       return res.status(500).send("Internal Server error Occured");
      }
    });
    Router.post('/register',async (req,res)=>{
        try{const Userdata = await User.findOne({email:req.body.email});
        console.log(Userdata)
        if(Userdata &&  Userdata !=('null' || 'undefined')){
            return res.json({data:"duplicate"})
        }
        //masking the password using bcrypt
       const salt =await bcrypt.genSalt(10)
        const pass = await bcrypt.hash(req.body.password,salt)
        //adding new user to database
            const user =await User.create({name:req.body.name,email:req.body.email,password:pass});
                return res.json({data:"succefull"})   
            }
        catch(error){
            if (error.code === 11000){
                 return res.status(500).json({data:error});
            }
          throw error;
        }}) 
module.exports=Router

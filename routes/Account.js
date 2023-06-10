const Router= require('express').Router();// to allow for route operations
const User = require('../models/account')// mongodb CRUD operations
const bcrypt=require('bcrypt')// to encrypt the passord and verify it
const jwt=require("jsonwebtoken")
// route the default request
Router.get('/',(req,res)=>{
   res.status(200).render('login',{data: "hello", title:"Login"});         // Only this runs.
      }
);

// route login request url
Router.post('/login',async(req,res, next)=>{
    try {
      //check user from database
        const user = await User.findOne({ email: req.body.email  });
        console.log(req.body);
        //check if user is true
        console.log(user)
        if(!user){
return res.render('login', {data: "Wrong email", title:"login"})
        }
        console.log(req.body.name)
        console.log(user.name)
        
        if(user.name !== req.body.name ){
          return res.render("login",{data:'require coreect username', title:"login"})
        }
        if (user) {
          //if password is not entered or undefined
      
          //verify password using bcrypt
          const cmp = await bcrypt.compare(req.body.password, user.password);
          console.log(cmp)

          if (cmp) {
            
            const payload ={name: req.body.name, accessAs:req.body.accessAs}
            const token =jwt.sign(payload , '09f26e402586e2faa8da4c98a35f1b20d6b033c60', { expiresIn: '180000s' })
           //send the access token to the client inside a cookie
               res.cookie("jwt", token, {secure: true, httpOnly: true})
               console.log(req.body.accesssAs)
               if(req.body.accesssAs=="seller"){
                return res.redirect('/items/')
               }
               else if(req.body.name=="admin" || (req.body.accesssAs==="admin")|| (req.body.name==="Admin")){
                return res.redirect('/admin')
               }else{
  //   return a success 200 code and message
           return res.redirect("/bid/auctions");
               }
          
          } else {
            //provide message for wrong password 
            return res.render("login",{data:'wrong Password', title:"login"});
          }
        } else {
          // provide message for wrong username or password
         return  res.render("register",{data:'wrong password or email', title:"login"});
        }
        //catch error in server 
      } catch (error) {
        console.log(error);
       return res.status(500).send("Internal Server error Occured");
      }
    });
    //get routr to register
    Router.get('/register',(req,res)=>{
      res.status(200).render('register',{data: "hello", title:"Register"});         // Only this runs.
         }
   );
    //route register request url
    Router.post('/register',async (req,res)=>{
        try{console.log(req.body)
          if(req.body.accessAs){
            return res.render("login",{data:'require accessAs', title:"login"});
          }
          //check user email from database
          const Userdata = await User.findOne({email:req.body.email});
        console.log(Userdata);
        
        //check if userdata is available
        if(Userdata &&  Userdata !=('null' || 'undefined')){
            return res.render("login",{data:'user email exist', title:"login"})// message response
        }
        
        //masking the password using bcrypt
       const salt =await bcrypt.genSalt(10)//generrate the key for encryption
       if(req.body.password== undefined){
        
        return res.render('register', {data:"empty password", title:"Register"})
       }
        const pass = await bcrypt.hash(req.body.password,salt)// encrypt the password using bcrypt hash
        //adding new user to database
            const user =await User.create({name:req.body.name,email:req.body.email,password:pass});
           const userName= req.body.name
           const token =jwt.sign({username:req.body.name, accessAs:req.body.accessAs}, '09f26e402586e2faa8da4c98a35f1b20d6b033c60', { expiresIn: '180000s' })
           //send the access token to the client inside a cookie
               res.cookie("jwt", token, {secure: true, httpOnly: true})
               if(req.body.name==="admin" && (req.body.accesssAs==="admin")){
                return res.redirect('/admin')
               }
               if(req.body.accesssAs === "seller"){
                return res.redirect('/items')
               }
            //   return a success 200 code and message
           return res.redirect("/bid/auctions");// message response  
            }
        catch(error){
          //error message 
            if (error.code === 11000){
                 return res.status(500).json({data:error});
            }
          throw error;
        }}) 
        Router.get('/logout', (req, res) => {
          res.clearCookie('auth_token');
          res.redirect('/login');
        });
module.exports=Router

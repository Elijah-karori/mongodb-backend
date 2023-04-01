const Router= require('express').Router()

 

Router.get('/',(req,res)=>{
 res.status(200).json({data:"welcome"})
});

Router.put('/',(req,res)=>{
     auth;
    res.json({"greetings":"hello"})
});
Router.delete('/',(req,res)=>{
    res.json({"greetings":"hello"})
})

module.exports=Router

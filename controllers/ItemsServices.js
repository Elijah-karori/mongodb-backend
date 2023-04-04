const items = require("./items");//import functions
const Auction =require("../models/bid")
 // get all items
exports.getAllitems = async (req, res) => {
  try {
    const goods = await items.getAllItems();
    console.log(goods)
    res.render('items' ,{data:goods, title:'fram items'});
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};
 
exports.createitem = async (req, res) => {
  try {
    const goods = await items.createItem(req.body);
    res.render('items' ,{data:"successful", title:'fram items'});
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};
exports.getForm =async (req, res)=>{
const uri = req.query.action

  console.log(uri)
  res.render('forms' ,{data:uri, title:'form items'});
}
exports.getitem = async (req, res) => {
  try {
const itemObject ={seller:req.body.name}
    const goods = await items.getItem(itemObject);
    console.log(goods)
    res.render('items' ,{data:goods, title:'form items'})
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};
exports.getUseritem = async (req, res) => {
  try {
    const itemObject ={seller:req.user.name}
    console.log(itemObject)
    const goods = await items.getAllItems(itemObject);
    console.log(goods)
    console.log("hello")
    if(goods === null){
console.log("empty")
     return res.render('items' ,{data:"User not found", title:'form items'})
    }
    res.render('items' ,{data:goods, title:'form items'})
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};
 
exports.updateitem = async (req, res) => {
  try {
    const auction = Auction.find({name:req.body.name})
    if(auction){
      return res.render("items", {data:auction, title: "auction"})
    }
    const itemObject ={name:req.body.name}
    const goods = await items.updateItem(itemObject, req.body);
    console.log(goods)
    res.render('items' ,{data:goods, title:'fram items'});
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};
 
exports.deleteitem = async (req, res) => {
  try {const objectz={name:req.body.name}
    console.log(objectz)
    const auction = Auction.findOne(objectz, objectz)
    console.log(auction)
  if(auction){
    return res.redirect("/items/")
  }
    const goods = await items.deleteItem(userItem);
    res.redirect("/items/");
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};
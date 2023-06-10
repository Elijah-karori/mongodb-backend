const items = require("./items");//import functions
const Auction =require("../models/bid")
const Item = require("../models/items")
const Deleteditem = require("../models/deletedItems")
 // get all items
exports.getAllitems = async (req, res) => {
  try {
    const goods = await items.getAllItems();
    //console.log(goods)
    res.render('items' ,{data:goods, title:'farm items'});
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};
 
exports.createitem = async (req, res) => {
  try {
    const goods = await items.createItem(req.body);
    res.render('items' ,{data:"successful", title:'farm items'});
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
const itemObject ={name:req.query.name}
    const goods = await items.getItem(itemObject);
    if(!goods){
      return res.render('items', {data:"item not found", title:"search"})
    }
    res.render('items' ,{data:goods, title:'form items'})
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};
exports.getUseritem = async (req, res) => {
  try {
    //get auctions from a database 
    console.log(req.user.name)
    const items = await Item.find({seller:req.user.name});
    console.log(items)

    if(items.length === 0){
      console.log(items)
      return res.render('items', {data:"auction not found", title:"Farm items"});
    }
    //response with all auctions
    res.render('items', {data:items, title:" My Farm items"});
  } catch (err) {
    console.error(err);
    res.status(500).send('Internal server error');
  }
};
 
exports.updateitem = async (req, res) => {
  try {
    console.log(req.body)
    const auction = await Auction.findOne({name:req.body.name});
    console.log(auction)
    if(auction){
      return res.render("items", {data:"auction found", title: "auction"})
    }
    const itemObject ={name:req.body.name}
    const itemdetails= await items.getItem(itemObject)
    if(!itemdetails){
      return res.redirect('/items/')
    }
    console.log(itemdetails.seller)
    if(itemdetails === req.user.name){
const goods = await items.updateItem(itemObject, req.body);
    console.log(goods)
    return res.render('items' ,{data:goods, title:'farm items'});
    }
    
    else{
      return res.redirect('/items/')
    }
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};
 
exports.deleteitem = async (req, res) => {
  try {const objectz={name:req.body.name}
    console.log(objectz)
    const auction = await Auction.findOne(objectz)
    console.log(auction)
  if(auction){
    return res.redirect("/items/")
  }
  const item = await items.getItem(objectz)
  
  if(!item){
    return res.redirect('/items/')
  }
  console.log(item.seller)
  if(req.user.name === item.seller){
     const deleteitem =new Deleteditem({
    name: item.name,
    description: item.description,
    image: item.image,
    seller: item.seller
  })
  await deleteitem.save();
  console.log('saved')
  await item.deleteOne();
   return  res.redirect("/items/");
  }
 else{
  return res.redirect("/items/");
 }
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};
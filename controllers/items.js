const Item =require('../models/items')
exports.getAllItems = async () => {
//find all items using mongoose find function
    return await Item.find();
  };
   // mongoose create function
  exports.createItem = async (item) => {
    
    return await Item.create(item);
  };
  //find  item using mongoose  function return one unique item
  exports.getItemById = async (id) => {
    
    return await Item.findById(id);
  };
   
  exports.updateItem = async (id, item) => {
    return await Item.findByIdAndUpdate(id, item);
  };
   
  exports.deleteItem = async (id) => {
    return await Item.findByIdAndDelete(id);
  };
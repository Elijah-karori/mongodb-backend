const Item =require('../models/items')//CRUD operation
exports.getAllItems = async () => {
//find all items using mongoose find function
    return await Item.find();
  };
   // mongoose create function
  exports.createItem = async (item) => {
    
    return await Item.create(item);
  };
  //find  item using mongoose  function return one unique item
  exports.getItem = async (id) => {
    
    return await Item.findOne(id);
  };
   //update item from database by a variable id
  exports.updateItem = async (id, item) => {
    return await Item.findByIdAndUpdate(id, item);
  };
   //delete item from database by a variable id
  exports.deleteItem = async (id) => {
    return await Item.findByIdAndDelete(id);
  };
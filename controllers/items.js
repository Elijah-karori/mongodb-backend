const Item =require('../models/items')
exports.getAllItems = async () => {

    return await Item.find();
  };
   
  exports.createItem = async (item) => {
    
    return await Item.create(item);
  };
  exports.getItemById = async (id) => {
    
    return await Item.findById(id);
  };
   
  exports.updateItem = async (id, item) => {
    return await Item.findByIdAndUpdate(id, item);
  };
   
  exports.deleteItem = async (id) => {
    return await Item.findByIdAndDelete(id);
  };
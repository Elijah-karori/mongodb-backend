const items = require("./items");
 
exports.getAllitems = async (req, res) => {
  try {
    const goods = await items.getAllItems();
    res.json({ data: goods, status: "success" });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};
 
exports.createitem = async (req, res) => {
  try {
    const blog = await items.createItem(req.body);
    res.json({ data: blog, status: "success" });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};
 
exports.getitemById = async (req, res) => {
  try {
    const blog = await items.getItemById(req.params.id);
    res.json({ data: blog, status: "success" });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};
 
exports.updateitem = async (req, res) => {
  try {
    const blog = await items.updateItem(req.params.id, req.body);
    res.json({ data: blog, status: "success" });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};
 
exports.deleteitem = async (req, res) => {
  try {
    const blog = await items.deleteItem(req.params.id);
    res.json({ data: blog, status: "success" });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};
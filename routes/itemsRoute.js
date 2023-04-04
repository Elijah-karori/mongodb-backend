const express = require("express");
const auth= require('./auth')

const {
  getAllitems,
  createitem,
  getitem,
  updateitem,
  deleteitem,
  getForm,
  getUseritem
} = require("../controllers/ItemsServices");// functions from the itemsServices.js 
 
const router = express.Router();// accept route request
 
router.route("/").get(auth,getAllitems);//routes for items
router.route("/item").get(auth,getitem);//routes for items
router.route("/items").get(auth,getUseritem)//routes for items
router.route("/create").get(auth,getForm).post(auth,createitem);//routes for items
router.route("/update").get(auth,getForm).post(auth,updateitem);
router.route("/delete").get(auth,getForm).post(auth,deleteitem);
module.exports = router;
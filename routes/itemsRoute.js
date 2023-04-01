const express = require("express");

const {
  getAllitems,
  createitem,
  getitemById,
  updateitem,
  deleteitem,
} = require("../controllers/ItemsServices");
 
const router = express.Router();
 
router.route("/").get(getAllitems).post(createitem);
router.route("/:id").get(getitemById).put(updateitem).delete(deleteitem);
 
module.exports = router;
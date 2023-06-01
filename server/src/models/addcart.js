//add cart schema

const mongoose = require("mongoose");


const Cart = new mongoose.Schema({

  current_user_id: String,
  product_id:String
});



module.exports = mongoose.model("Cart", Cart);
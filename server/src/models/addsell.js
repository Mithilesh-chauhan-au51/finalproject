//add sell schema

const mongoose = require("mongoose");


const Addsell = new mongoose.Schema({

  category: { type: String, required: true },
  brand: { type: String, required: true },
  price: { type: String, required: true },
  addressone: String,
  addresstwo: String,
  city: { type: String, required: true },
  state: { type: String, required: true },
  phone: { type: String, required: true },
  productdetail: { type: String, required: true },
  description: { type: String },
  url: [{ type: String, required: true }],
  user_id: String,
  firstname:String,
  lastname:String
});



module.exports = mongoose.model("Addsell", Addsell);
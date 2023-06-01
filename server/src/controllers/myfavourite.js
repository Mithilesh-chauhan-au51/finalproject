//import addsell model
const Addsell = require("../models/addsell");
//import cart model
const Cart = require("../models/addcart");

//define MyFavourites function
const MyFavourites = async (req, res) => {
  try {
    const id = req.params.id;
    let ids_data_from_cart = await Cart.find({ current_user_id: id });
    
    let arr = await Promise.all(ids_data_from_cart.map(async (x) => {
      let proddata = await Addsell.findOne({ _id: x.product_id });
      //console.log("arr", proddata);
      return proddata;
    }));

    //console.log(arr);
    res.json({ data: arr });
  } catch (e) {
    console.log(e.message);
    res.status(400).json({ message: "Failed to retrieve product data." });
  }
};

module.exports = MyFavourites;

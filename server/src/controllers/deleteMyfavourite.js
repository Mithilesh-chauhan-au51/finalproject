//import cart model
const Cart = require("../models/addcart");

//define DeleteMyFavourite function
const DeleteMyFavourite = async (req, res) => {
  try {
   const id = req.params.id;
    console.log(id);
   
    
    
  await Cart.findOneAndDelete({product_id: id });

    res.send( "cart deleted successfully" );
  } catch (e) {
    console.log(e.message);
    res.status(400).json({ message: "Failed to retrieve product data." });
  }
  
};
module.exports =DeleteMyFavourite
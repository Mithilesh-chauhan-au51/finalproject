//import addsell model
const Addsell = require("../models/addsell");
//import cart model
const Cart = require("../models/addcart");

//define delete add function
const Deleteadd = async (req, res) => {
  try {
   const id = req.params.id;
    //console.log(id);
   
    await Addsell.findByIdAndDelete(id);
    
  await Cart.findOneAndDelete({product_id: id });

    res.send( "Product deleted successfully" );
  } catch (e) {
    console.log(e.message);
    res.status(400).json({ message: "Failed to retrieve product data." });
  }
  
};
module.exports =Deleteadd
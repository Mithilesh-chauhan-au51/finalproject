// Import the Cart model
const Cart =require("../models/addcart")


// Define the Addcart controller function
const Addcart = async (req, res) => {
  
    const {current_user_id,product_id} = req.body;
  // console.log(current_user_id,product_id)
 try {

  let  exist_product= await Cart.findOne({product_id:product_id,current_user_id:current_user_id})
  if(!exist_product){
    let cart=await new Cart({
      product_id:product_id,
      current_user_id:current_user_id
    })
    await cart.save();
     res.status(200).send( 'Item added to cart successfully see in My favourites tab' )
  }
   else  res.status(200).send( 'Item is already added to cart')  
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Error adding item to cart' });
  }
};

module.exports = Addcart;

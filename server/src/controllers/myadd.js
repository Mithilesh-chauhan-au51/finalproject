//import addsell model
const Addsell = require("../models/addsell");

//define myadds function
const Myadds = async (req, res) => {
  try {
   const id = req.params.id;
   // console.log(id);
    let proddata = await Addsell.find({ user_id: id });
    res.json({ data: proddata });
  } catch (e) {
    console.log(e.message);
    res.status(400).json({ message: "Failed to retrieve product data." });
  }
  
};
module.exports =Myadds
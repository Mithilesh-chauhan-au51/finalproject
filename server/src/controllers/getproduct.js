//import addsell model
const Addsell = require("../models/addsell");

//define getprod function
const getprod= async (req, res) => {
  try {
    let proddata = await Addsell.find()
    res.json( { data: proddata })
  }
 catch (e) {
    console.log(e.message)
    res.status(400).json({ message: "Failed to retrieve product data." })
  }
  // console.log("check")
  // res.send("hai")
}
module.exports =getprod


//import Register model
const Register = require("../models/register");

//define register function
const Registeruser = async (req, res) => {
  try {
   const id = req.params.id;
   // console.log(id);
    let userdata = await Register.find({ _id: id });
    res.json({ data: userdata });
  } catch (e) {
    console.log(e.message);
    res.status(400).json({ message: "Failed to retrieve userdata ." });
  }
  
};
module.exports =Registeruser
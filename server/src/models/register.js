//authentication schema

const mongoose = require("mongoose");



const validateEmail = (email) => {
  return String(email)
    .toLowerCase()
    .match(
      /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
    );
};


// register user schema
const registerschema = new mongoose.Schema({
  firstname: {
    type: String,
    required :true
  }, 
  lastname: {
    type: String,
    required :true
  }, 
   email:{
    type:String,
    required:true,
    lowercase:true,
    maxLength:60,
    minLength:5,
    validate:{
      validator:(v)=>validateEmail(v),
      message:props=>`${ props.value}is not email`
    }
  }, 
  password:{
    type: String,
    required:true,
     minLength:6,
    maxLength:60
  },
  phoneNumber: {
    type: String,
    required: true,
    validate: {
      validator: function(v) {
        return /\d{10}/.test(v);
      },
      message: props => `${props.value} is not a valid phone number!`
    }
  },
});



module.exports = mongoose.model("register", registerschema);
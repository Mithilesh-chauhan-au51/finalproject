


//import register model
const Register = require("../models/register");
//import bcrypr
const bcrypt=require("bcrypt")
//import jwt
const jwt=require("jsonwebtoken")
const secretekey = process.env['SECRET_KEY']

//define auth functions
const  register=async (req,res)=>{
  var {firstname,lastname,email,password,phoneNumber}=req.body
try{
  const isExisting=await Register.findOne({email:email})
  if(isExisting){
  throw new Error("user with this mail is already exist")
  }
  const hashpassword= await bcrypt.hash(password,10)
  const newuser =await Register.create({
    firstname:firstname,
    lastname:lastname,
    email:email,
    phoneNumber:phoneNumber,
    password:hashpassword
  }) 
  
  //below we are creating a new object others that contains all the properties of newUser except for the password property. This is useful when we want to return the user data to the client without including the sensitive password information.

  var{password,...others}=newuser._doc
  //This line of code is using the jwt package to create a JSON Web Token (JWT) with the user's email and ID as the payload.
  const token = jwt.sign({ email: newuser.email, id: newuser._id }, secretekey,{expiresIn:"5h"})

  return res.status(201).json({others,token})
}
  
   catch(error){
    return res.status(500).json(error.message)
  }  
}

const login=async (req,res)=>{
  var {email,password}=req.body
  try{
     const existuser=await Register.findOne({email:email})
    if(!existuser){
      throw new Error("user credentials are wrong")
    }
    const comparepassword=await bcrypt.compare(password,existuser.password)
    if(!comparepassword){
      throw new Error("user credentials are wrong")
    }
    var{password,...others}=existuser._doc
  const token = jwt.sign({ email: existuser.email, id: existuser._id }, secretekey,{expiresIn:"5h"})

     return res.status(201).json({others,token})
    
  }
  catch(error){
     return res.status(500).json(error.message)
  }
}





module.exports ={register,login}

//import bcrypt,register,nodemailer,randomstring
const bcrypt=require("bcrypt")
const Register = require("../models/register");
const nodemailer = require('nodemailer');
const randomstring = require('randomstring');




const mail = process.env['ourmail']
var password = process.env['ourmailpassword']
console.log(password ,mail)

//nodemailer setup
const transporter = nodemailer.createTransport({

  service: 'gmail',
  auth: {
    user: mail,
    pass: password
  }
});

//function for generate otp
function generateOTP() {
  const otp = randomstring.generate({
    length: 4,
    charset: 'numeric'
  });
  return otp;
}


// Send OTP to user's email
function sendOTP(email, otp) {
 // console.log(mail,otp,email)
  const mailOptions = {
    from: mail,
    to: email,
    subject: 'Password change OTP',
    text: `Your OTP for changing password is ${otp}`
  };
  transporter.sendMail(mailOptions, (err, info) => {
    if (err) {
      console.log(err);
    }
    

  });
}

//sendotp to client side to verfication
const Sendotp = async (req, res) => {
  try {
    const email = req.body.email;
    const existing=await Register.findOne({email:email})
    if(existing){
    const otp = generateOTP();
    sendOTP(email, otp);
      res.json({otp:otp,email:email})
    }
    else{
      res.send("enter correct email")
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Failed to send OTP' });
  }
};

//define ChangePassword function
const ChangePassword =async (req,res)=>{


   try {
    const email = req.body.email;
    const password = req.body.password;
    //console.log(password)
    const hashedpassword = await bcrypt.hash(password, 10)
    const user = await Register.findOne({ email: email });
    user.password = hashedpassword;
    await user.save();
   
     res.status(200).json({ message: "your password changed sucessfully" })
    
   
  }
  catch (err) {
    console.log(err)
    
    res.status(500).json({ message: "somenthing went wrong" })
  }
}



module.exports ={Sendotp,ChangePassword}

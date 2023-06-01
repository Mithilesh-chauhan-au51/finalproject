// import express modules
let express=require("express")
// import fileUpload modules
const fileUpload = require('express-fileupload');





// import all important controllers
let {register,login}=require("../controllers/auth")
let sell=require("../controllers/addsell")
let getprod=require("../controllers/getproduct")
let Myadds=require("../controllers/myadd")
let Deleteadd =require("../controllers/deleteadd")
let Addcart =require("../controllers/addcart")
let MyFavourites =require("../controllers/myfavourite")
let DeleteMyFavourite=require("../controllers/deleteMyfavourite")
let {Sendotp,ChangePassword} =require("../controllers/forgetpassword")
let {Newcon,Getconuser} =require("../controllers/conversations")
let {Postmessage,Getmessage} =require("../controllers/messages")
let Registeruser=require("../controllers/registerUser")


let authentication =require("../middlewears/authentication")



let router=express()
router.use(fileUpload());

router.get("/",(req,res)=>{
  res.send("server")
})

// define routes

router.post("/register",register)

router.get("/registeruser/:id",Registeruser)

router.post("/login",login)

router.post("/addsell",authentication,sell)

 router.get("/allprod",getprod)

router.get("/myadds/:id",authentication, Myadds);

router.delete("/deleteadd/:id",authentication, Deleteadd);

router.post("/addcart",authentication,Addcart)

router.get("/myfavourite/:id",authentication, MyFavourites);

router.delete("/deleteMyfavourite/:id",authentication, DeleteMyFavourite);


router.post("/sendotp",Sendotp)

router.post("/changepassword",ChangePassword)


//chat conversations
router.post("/chat",authentication,Newcon)

router.get("/chat/:userId",Getconuser)




//caht message
router.post("/message",Postmessage)

router.get("/message/:conversationId",Getmessage)

//export module
module.exports= router
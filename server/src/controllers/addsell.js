// Import Addsell model
const Addsell =require("../models/addsell")

//import cloudinary
const cloudinary = require("../cloudinary/cloudinary");
//import uuid
const uuid = require("uuid");

// Define the addsell  function
const sell = async (req, res) => {
  try {
    const { category, brand, price, addressone, addresstwo, city, state, phone, productdetail, description, images, user_id ,firstname,lastname} = req.body;
    
    const imagesArray = JSON.parse(images);
    const uploadedImageUrls = [];
    
//console.log(imagesArray)
    await Promise.all(
  imagesArray.map(async (imageObj) => {
    const imageSrc = Object.values(imageObj)[0]; 
    const public_id = uuid.v4();
    const uploadImage = await cloudinary.uploader.upload(imageSrc, {
      upload_preset: "i6jbmo2e",
      public_id: public_id,
      allowed_formats: ["jpg", "jpeg", "png", "gif", "svg", "ico", "jfif", "webp","avif"],
    });
    uploadedImageUrls.push(uploadImage.secure_url);
   // console.log(uploadedImageUrls)
  })
);
    let AddSellData= await new Addsell({
      url: uploadedImageUrls,
      category: category,
      brand: brand,
      price:price,
      user_id:user_id,
      addressone:addressone,
      addresstwo:addresstwo,
      city:city,
      state:state,
      phone:phone,
  description:description,
      productdetail:productdetail,
      firstname:firstname,
      lastname:lastname
    });

await AddSellData.save()


    //console.log(uploadedImageUrls);
    res.send("Files uploaded successfully!");
  } catch (error) {
    console.error(error);
    res.status(500).send("Internal server error");
  }
};

module.exports = sell;

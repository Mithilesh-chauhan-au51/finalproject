//cloudinary setup

const cloudinary = require('cloudinary').v2;

const cloudinaryapikey = process.env['apikey']
const cloudname = process.env['cloudname']
const cloudinaryapiSecret = process.env['apisecerete']

// Configuration 
cloudinary.config({
  cloud_name:cloudname,
  api_key: cloudinaryapikey,
  api_secret: cloudinaryapiSecret
});

module.exports=cloudinary
//import express module
const express = require("express")
const app = express()

//import cors
const cors = require('cors');
app.use(cors());

let mongoose = require("mongoose")

const bodyParser = require('body-parser');
//connect mongo server
const username = process.env['MONGO_USERNAME']
const password = process.env['MONGO_PASSWORD']
const port = process.env['port']

let db = mongoose.connect(`mongodb+srv://${username}:${password}@cluster0.1koergc.mongodb.net/capstone?retryWrites=true&w=majority`, { useNewUrlParser: true, useUnifiedTopology: true })
.then(() => { console.log("db connected sucessfully") })
.catch((err) => { console.log(`err`, err.message) })

// Serve static files from the 'public' directory
app.use(express.static(__dirname + "/public"))

//use middelwears Configure body parsing 
app.use(express.json({limit:"50mb"}))
app.use(bodyParser.urlencoded({ extended: true,limit:"50mb" }));


// import user main   router
let routersuser = require("./src/routers/user")
app.use("", routersuser)//we not assign endpont default it take first "/" is end point





// Start the server and listen on the specified port
app.listen(port, () => { console.log("app run on port 4000") })
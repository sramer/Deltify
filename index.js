var express = require('express')
var mongoose = require('mongoose')
const bodyParser = require('body-parser')
require('dotenv/config')

var app = express()

app.use(bodyParser.json())


const artists = require("./routes/artist")

app.use("/artists", artists)

app.get("/", (req,res) => {
    res.send("Hello world");
})

mongoose.connect(process.env.DB_CONNECT, () => {
    console.log("Connected to DB")
} )

app.listen(3000, () => {
    console.log("Server started at localhost:3000")
})
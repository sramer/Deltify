var express = require('express')
var mongoose = require('mongoose')
const bodyParser = require('body-parser')
const cors = require('cors')
require('dotenv/config')

var app = express()

app.use(bodyParser.json())
app.use(cors({
    origin: "*"
}))


const artists = require("./routes/artist")
const songs = require("./routes/song")

app.use("/artists", artists)
app.use("/songs", songs)

app.get("/", (req,res) => {
    res.send("Hello world");
})

mongoose.connect(process.env.DB_CONNECT, () => {
    console.log("Connected to DB")
} )

app.listen(8000, () => {
    console.log("Server started at localhost:3000")
})
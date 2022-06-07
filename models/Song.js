const mongoose = require('mongoose')
// const Artist = require("./Artist")

const songSchema = mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    artist : [
        {type: mongoose.Schema.Types.ObjectId, ref: "Artist", required: true} // reference to artist model
    ],
    dateOfRelease: {
        type: Date,
        required: true
    },
    cover: {
        type: String,
        required: true
    },
    rating: {
        type: Number,
        required: true
    }
    
})

module.exports = mongoose.model("Song", songSchema)
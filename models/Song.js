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
        type: mongoose.Mixed,
        1: Number,
        2: Number,
        3: Number,
        4: Number,
        5: Number,
        default: {1:1, 2:1, 3:1, 4:1, 5:1}
    },
    avr: {
        type: String,
        default: "0"
    }
    
})

module.exports = mongoose.model("Song", songSchema)
const mongoose = require("mongoose")

const ArtistSchema = mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    dateOfBirth: {
        type: Date,
        required: true
    },
    bio: {
        type: String,
        required: true
    },
    songs: [
        {type: mongoose.Schema.Types.ObjectId, ref:"Song"}
    ],
    avsr: {
        type: String,
        default: "0"
    }
})

module.exports = mongoose.model("Artist", ArtistSchema)
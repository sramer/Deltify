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
    }
})

module.exports = mongoose.model("Artist", ArtistSchema)
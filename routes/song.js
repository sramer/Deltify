const express = require('express')
const Song = require("../models/Song")

const song = express.Router()

song.get("/", async (req,res) => {
    try {
        const song = await Song.find().populate('artist');
        res.json(song)
    } catch (err) {
        res.json({message: err})
    }
})

song.post("/", async (req,res) => {
    const song = new Song({
        name: req.body.name,
        artist: req.body.artist,
        dateOfRelease: req.body.dateOfRelease,
        cover: req.body.cover,
        rating: req.body.rating
    });

    try {
        const saveSong = await song.save();
        res.json(saveSong)
    } catch (err) {
        res.json({message: err})
    }
})


song.get("/:id", async (req,res) => {
    try {
        const findSong = await Song.findById(req.params.id);
        res.json(findSong)
    } catch (err) {
        res.json({message: err})
    }
})

module.exports = song;
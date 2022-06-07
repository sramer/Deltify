const express = require("express");
const Artist = require("../models/Artist")

const artist = express.Router();

// Get All artists
artist.get("/", async (req,res) => {
    try {
        const artist = await Artist.find();
        res.json(artist)
    } catch (err) {
        res.json({message: err})
    }
})

// Create an Artist
artist.post("/", async (req,res) => {
    const artist = new Artist({
        name: req.body.name,
        dateOfBirth: req.body.dateOfBirth,
        bio: req.body.bio
    });

    try {
        const saveAritst = await artist.save();
        res.json(saveAritst)
    } catch (err) {
        res.send({message: err})
    }
})

// Get a single artist
artist.get("/:id", async (req,res) => {
    try {
        const findArist = await Artist.findById(req.params.id);
        res.json(findArist)
    } catch (err) {
        res.json({message: err})
    }
}) 

// Delete an artist
artist.delete("/:id", async (req,res) => {
    try {
    const deleteArtist = await Artist.deleteMany({_id: req.params.id});
    res.json(deleteArtist)
    } catch (err) {
        res.json({message: err})
    }
})

// Update an artist bio
artist.patch("/bio/:id", async (req,res) => {
    try {
    const updateArtistBio = await Artist.updateOne({_id: req.params.id}, {$set: {bio: req.body.bio}})
    res.json(updateArtistBio)
    } catch (err) {
        res.json({message: err})
    }
})


module.exports = artist;

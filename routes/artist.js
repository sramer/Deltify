const express = require("express");
const Artist = require("../models/Artist")
const Song = require('../models/Song')

const artist = express.Router();

// Get All artists
artist.get("/", async (req,res) => {
    try {
        const artist = await Artist.find().populate('songs');
        // const getArtist = artist.map(artst => getArtistRating(artst))
        for(let i=0; i<artist.length; i++) {
            id = artist[i]._id
            const getArtist = (await getArtistRating(artist[i])).toString()
            const updateArtist = await Artist.findOneAndUpdate({_id: id}, {$set: {avsr: getArtist}})
        } 
        res.json(artist)
    } catch (err) {
        console.log(err)
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
        const findArtist = await Artist.findById(req.params.id).populate('songs');
        const artistRating = getArtistRating(findArtist)
        console.log(artistRating)
        res.json(findArtist)
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


const getArtistRating = async (artist) => {
    const songs = await Song.find();
    const getSongRating = songs.map(song => parseFloat(song.avr))
    const calculateSongRating = getSongRating.reduce((total,num) => total+num)
    const getAverageRating = artist.songs.map(song => parseFloat(song.avr));
    if(getAverageRating.length > 0) {
        const calculateArtistRating = getAverageRating.reduce((total,num) => total+num);
        return calculateArtistRating / calculateSongRating
    } else {
        return 0;
    }
}

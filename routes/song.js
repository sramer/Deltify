const express = require('express')
const Song = require("../models/Song")
const Artist = require("../models/Artist")

const song = express.Router()

// Get songs

song.get("/", async (req,res) => {
    try {
        const song = await Song.find().populate('artist');
        const rating = song.map(sng => sng.rating).map(rat => Object.values(rat))
        const getRating = rating.map(rate => getSongRating(rate))
        const calculateRating = getRating.reduce((total,num) => total+num)
        res.json(song)
    } catch (err) {
        res.json({message: err})
    }
})



// Create a new song

song.post("/", async (req,res) => {
    const song = new Song({
        name: req.body.name,
        artist: req.body.artist,
        dateOfRelease: req.body.dateOfRelease,
        cover: req.body.cover,
    });

    try {
        const saveSong = await song.save();
        const artistID = song.artist
        for(i=0; i<artistID.length; i++) {
            id = artistID[i]
            await Artist.updateOne({_id: id}, {$push: {songs: saveSong._id}})
        }
        res.json(saveSong)
    } catch (err) {
        res.json({message: err})
    }
})

// Update Song Rating

song.patch("/:id/:rating", async (req,res) => {
    const getSong = await Song.findById(req.params.id);
    const rating = parseInt(req.params.rating)
    switch(rating) {
        case 1:
            try {
                const oldRating = getSong.rating[1]
                const newRating = oldRating + 1
                const sdsRating = getSong.rating
                const ratingArray = Object.values(sdsRating)
                const songRating = getSongRating(ratingArray).toString()
                const updateRating = await Song.findOneAndUpdate({_id: req.params.id}, {$set: {'rating.1': newRating, avr: songRating}})
                res.json(updateRating)
            } catch (err) {
                res.json({message: err})
            }
            break;
        case 2:
            try {
                const oldRating = getSong.rating[2]
                const newRating = oldRating + 1
                const sdsRating = getSong.rating
                const ratingArray = Object.values(sdsRating)
                const songRating = getSongRating(ratingArray).toString()
                const updateRating = await Song.findOneAndUpdate({_id: req.params.id}, {$set: {'rating.2': newRating, avr: songRating}})
                res.json(updateRating)
            } catch (err) {
                res.json({message: err})
            }
            break;
        case 3:
            try {
                const oldRating = getSong.rating[3]
                const newRating = oldRating + 1
                const sdsRating = getSong.rating
                const ratingArray = Object.values(sdsRating)
                const songRating = getSongRating(ratingArray).toString()
                const updateRating = await Song.findOneAndUpdate({_id: req.params.id}, {$set: {'rating.3': newRating, avr: songRating}})
                res.json(updateRating)
            } catch (err) {
                res.json({message: err})
            }
            break;
        case 4:
            try {
                const oldRating = getSong.rating[4]
                const newRating = oldRating + 1
                const sdsRating = getSong.rating
                const ratingArray = Object.values(sdsRating)
                const songRating = getSongRating(ratingArray).toString()
                const updateRating = await Song.findOneAndUpdate({_id: req.params.id}, {$set: {'rating.4': newRating, avr: songRating}})
                res.json(updateRating)
            } catch (err) {
                res.json({message: err})
            }
            break;
        case 5:
            try {
                const oldRating = getSong.rating[5]
                const newRating = oldRating + 1
                const sdsRating = getSong.rating
                const ratingArray = Object.values(sdsRating)
                const songRating = getSongRating(ratingArray).toString()
                const updateRating = await Song.findOneAndUpdate({_id: req.params.id}, {$set: {'rating.5': newRating, avr: songRating}})
                res.json(updateRating)
            } catch (err) {
                res.json({message: err})
            }
            break;
        
        default:
            res.json({message: "Nd data is sent"})
    }
})


// Get a single song

song.get("/:id", async (req,res) => {
    try {
        const findSong = await Song.findById(req.params.id);
        res.json(findSong)
    } catch (err) {
        res.json({message: err})
    }
})

module.exports = song;

// Evan Miller Bayesian approch algorith

const getSongRating = (rating) => {

    const sum = (array) => {return array.reduce((x,y) => x+y, 0) };
    const square = (x) => {return x*x; };

    const confidenz = 1.65;

    const fakeRatings = rating.map(count => count + 1)
    const N = sum(fakeRatings)

    const average = sum(fakeRatings.map((count, i) => (i + 1) * count)) / N;

    const x = sum(fakeRatings.map((count, i) => square(i+1)*count)) / N;
    const standardDivision = Math.sqrt((x - square(average)) / (N+1));

    return average - confidenz * standardDivision
}


const express = require("express")
const Model = require("../models/Artist")

const artist = express.Router();

artist.get("/", async (req,res) => {
    try {
        const artist = await Model.find();
        res.json(artist)
    } catch (err) {
        res.json({message: err})
    }
})

artist.post("/", async (req,res) => {
    const artist = new Model({
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


module.exports = artist;

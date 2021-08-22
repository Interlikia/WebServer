const mongoose = require('mongoose');

const animeSchema = new mongoose.Schema({
    title:{
        type: String,
        required: true,
        unique: true,
        max: 255,
        min: 1
    },
    image:{
        type: String,
        required: true,
        max: 2048,
        min: 3
    }

});

module.exports = mongoose.model('Anime', animeSchema);
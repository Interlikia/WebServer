// Modelo Anime

// Import do mongoose
const mongoose = require('mongoose');

// Inicializa o Schema "Anime" do BD
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
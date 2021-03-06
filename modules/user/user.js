// Modelo Usuário

// Import do mongoose
const mongoose = require('mongoose');

// Inicializa o Schema "Usuário" do BD
const userSchema = new mongoose.Schema({
    email:{
        type: String,
        required: true,
        unique: true,
        max: 255,
        min: 6
    },
    password:{
        type: String,
        required: true,
        max: 20,
        min: 3
    }
});

module.exports = mongoose.model('User', userSchema);
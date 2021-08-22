// Constantes de configuração
const express = require('express');
const app = express();
const dotenv = require('dotenv');
const mongoose = require('mongoose');
const cors = require('cors');

// Rotas
const authRoute = require('./routes/auth');

dotenv.config();

// Configuração do Banco de Dados
mongoose.connect(process.env.DB_CONNECT, { useNewUrlParser: true, useUnifiedTopology: true }, () => console.log('Conectado ao banco de dados.'));

// Middleware
app.use(cors());
app.use(express.json())

// Rotas 
app.use('/auth/user', authRoute);

// Configuração Porta do Servidor
const PORT = process.env.PORT || 3000;
app.listen(PORT);
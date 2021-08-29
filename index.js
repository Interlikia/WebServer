// Constantes de configuração
const express = require('express');
const app = express();
const dotenv = require('dotenv');
const mongoose = require('mongoose');
const cors = require('cors');

// Rotas
const authRoute = require('./routes/auth');
const apiRoute = require('./routes/anime_api');

// Configura o dotenv para utilizar o arquivo .env para o endereço do BD
dotenv.config();

// Conexão com o banco de dados
mongoose.connect(process.env.DB_CONNECT, { useNewUrlParser: true, useUnifiedTopology: true }, () => console.log('Conectado ao banco de dados.'));

// Middlewares
app.use(cors()); //Necessário para cross origin request
app.use(express.json());

// Rotas
app.use('/auth/user', authRoute); // exemplo de uso https://meusite.com/auth/user/{método post ou get}
app.use('/api', apiRoute); // exemplo de uso https://meusite.com/api/{método post ou get}

// Configuração Porta do Servidor, porta onde o servidor será aberto
const PORT = process.env.PORT || 3000;
app.listen(PORT);
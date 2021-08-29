// Imports necessários
const router = require('express').Router();
const Anime = require('../modules/anime_api/anime');
const jWT = require('jsonwebtoken');

// Segredo JWT verificar se o usuário está logado para usar a API, é o mesmo segredo utilizado no login
const secret = "nadave";

// Método post '/create' utilizado para criar uma postagem no BD referente a um anime
router.post('/create', async (req, res) => {
    const { token, title, image } = req.body
    try{
        jWT.verify(token, secret)
        const response = await Anime.create({
           title,
           image
        })
        console.log(response)
    } catch(error) {
        if(error.code === 11000){
            res.status(201)
            return res.json({ status: 'error', error: 'Esse anime já existe em nosso banco de dados.' })
        }else {
            res.status(404)
            return res.json({ status: 'error', error:'Tentando burlar o sistema né? Hoje não.'})
        }
    }
    res.json({ status: 'ok' })
});

// Método get '/lookup' utilizado para pesquisar uma entrada no BD
router.get('/lookup', async (req, res) => {
    const { token, title } = req.query
    const regex = new RegExp(title, 'i')
    try{
        jWT.verify(token, secret)
        const response = await Anime.find({ title: { $regex: regex } })
        if(response.length === 0) {
            res.status(201)
            return res.json({ status: 'error', error: 'Não encontrei esse anime, desculpe.' })
        } else {
            console.log(response)
            return res.json({ status: 'found', data: response })
        }
    } catch(error) {
        res.status(404)
        return res.json({ status: 'error', error:'Tentando burlar o sistema né? Hoje não.'})
    }
});

module.exports = router;
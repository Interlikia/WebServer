const router = require('express').Router();
const Anime = require('../modules/anime_api/anime');
const jWT = require('jsonwebtoken');

// JWT Secret
const secret = "nadave";

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
        throw error
    }
    res.json({ status: 'ok' })
});

router.get('/lookup', async (req, res) => {
    const { token, title } = req.query

    // Expressão regular de pesquisa.
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
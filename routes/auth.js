const router = require('express').Router();
const User = require('../modules/user/User');
const bcrypt = require('bcryptjs');
const jWT = require('jsonwebtoken');

// JWT Secret
const secret = "nadave";

router.get('/login', async (req, res) => {
    const { email, password } = req.query;
    const user = await User.findOne({ email }).lean();
    if (!user) {
        res.status(201)
        return res.json({ status: 'error', error: 'Email ou senha inválido.' });
    }
    if (await bcrypt.compare(password, user.password)) {
        const token = jWT.sign({
            email: user.email
        },
            secret)

        return res.json({ status: 'ok', data: token })
    }

    res.status(201)
    res.json({ status: 'error', error: 'Email ou senha inválidos.' })
});

router.post('/register', async (req, res) => {
    
    const salt = await bcrypt.genSaltSync(10)
    const password = await req.body.password
    const user = new User({
        email: req.body.email,
        password: bcrypt.hashSync(password, salt)
    })

    try {
        await user.save()
    } catch (error) {
        if (error.code === 11000) {
            res.status(201)
            return res.json({ status: 'error', error: 'Usuário já cadastrado.' })
        }
        throw error
    }
    res.json({ status: 'ok' })
});

module.exports = router;
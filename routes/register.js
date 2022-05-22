const express = require('express');
const router = express.Router();
const User = require('../models/User')
const { check, validationResult } = require('express-validator');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken')
const config = require('config');
const { route } = require('./blog/blog');
const secret = config.get('jwtSecret')

router.get('/', (req, res) => {
    res.send('hello from regsiter')
})

router.post('/', [
    check('name', 'Name is required').not().isEmail(),
    check('email', 'Email is required').not().isEmpty().isEmail(),
    check('password', 'Password is required').not().isEmpty().isLength({ min: 6 })
], async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() })
    }

    try {
        let user = await User.findOne({ email: req.body.email });

        if (user) {
            return res.status(400).json({ msg: 'Email already in use' })
        }

        const { email, name, password } = req.body

        user = new User({
            name,
            email,
            password
        })

        const salt = await bcrypt.genSalt(10);

        user.password = await bcrypt.hash(password, salt);

        await user.save();

        const payload = {
            user: {
                id: user.id
            }
        }

        jwt.sign(payload, secret, { expiresIn: '3600000' }, (err, token) => {
            if (err) throw err
            res.json({ token })
        })




    } catch (err) {
        console.log(err.message);
        return res.status(500).send('server error')
    }

})

router.get('/users', async (req, res) => {
    try {
        const users = await User.find({});
        res.json(users)
    } catch (err) {
        console.log(err.message)
    }
})

module.exports = router
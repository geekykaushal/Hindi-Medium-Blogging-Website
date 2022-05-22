const express = require('express');
const router = express.Router();
const {check , validationResult} = require('express-validator')
const bcrypt = require('bcryptjs');
const User = require('../models/User');
const jwt = require('jsonwebtoken')
const auth = require('../middleware/auth')
const config = require('config')
const secret = config.get('jwtSecret')
const Blog  = require('../models/blog')

router.get('/' , auth ,  async (req , res) => {
    try {
        const user = await User.findById(req.user.id).select('-password');
    if(!user) {
        return res.status(401).json({msg: "NO user Found"})
    }

    res.json(user)
    } catch (err) {
        console.log(err.message);
        return res.status(500).send('server error')
    }
})

router.post('/' , [
   // check('email', 'Email is required').isEmpty(),
    check('password' , 'password is required').not().isEmpty()
] , async (req,res) => {
   const errors = validationResult(req);
   if(!errors.isEmpty()) {
       return res.status(400).json({errors : errors.array()})
   }

   const {email , password} = req.body

   try {
       const user = await User.findOne({email})

       if(!user) {
           return res.status(400).json({msg:"Invalid Data"})
       }

       const isMatch = await bcrypt.compare(password , user.password)

       if(!isMatch) {
           return res.status(400).json({msg :"Invalid Data"})
       }

       const payload = {
           user : {
               id : user.id
           }
       }

      jwt.sign(payload , secret , {expiresIn :'360000'} , (err , token) => {
          if(err) throw err;
          res.json({token})
      })


   } catch (err) {
       console.log(err.message);
       return res.status(500).send('server error')
   }
})


router.get('/allblogs', async (req, res) => {
    try {

        const posts = await Blog.find().sort({date: -1})
        if(!posts) {
            return res.status(201).json({msg:"No posts"})
        }
        res.json(posts)
        console.log(posts)
    } catch (err) {
        console.log(err)
        res.status(500).send('server error')
    }
})

module.exports = router
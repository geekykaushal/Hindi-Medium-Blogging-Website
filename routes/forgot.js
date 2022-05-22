const express = require('express')
const router = express.Router();
const nodemailer = require('nodemailer')
const User = require('../models/User')
const crypto = require('crypto')
const async= require('async')



router.post('/', function(req, res, next) {
    async.waterfall([
      function(done) {
        crypto.randomBytes(20, function(err, buf) {
          const token = buf.toString('hex');
          done(err, token);
        });
      },
      function(token, done) {
        User.findOne({ email: req.body.email }, function(err, user) {
          if (!user) {
            return res.status(404).json({msg: "No User with this email"})
          }
  
          user.resetPasswordToken = token;
          user.resetPasswordExpires = Date.now() + 3600000; // 1 hour
  
          user.save(function(err) {
            done(err, token, user);
          });
        });
      },
      function(token, user, done) {
        const smtpTransport = nodemailer.createTransport({
          host: "smtp.mailtrap.io",
          port : 2525,
          auth: {
            user: '937236ce1a442d',
            pass: '6f7ef421db4b6c'
          }
        });
        const mailOptions = {
          to: user.email,
          from: "ashishskkumar321@gmail.com",
          subject: 'Node.js Password Reset',
          html: `<h2>Click the Link Below to Reset Your Password </h2> \n
          <p>Note : Ignore if this is not send by you </p>
          <a href="http://localhost:3000/reset/${token}">Click</a>`
        };
        smtpTransport.sendMail(mailOptions, function(err) {
          done(err, 'done');
        });
      }
    ], function(err) {
       if(err) {
           next()
           return res.status(501).send("Error in sending email")
       }
    });
  });


module.exports = router
const express = require('express');
const router = express.Router();
const async = require('async')
const nodemailer = require('nodemailer')
const User = require('../models/User')
const bcrypt = require('bcryptjs')

router.post('/:token', function(req, res) {
    async.waterfall([
      function(done) {
        User.findOne({ resetPasswordToken: req.params.token, resetPasswordExpires: { $gt: Date.now() } }, function(err, user) {
          if (!user) {
            return res.status(404).json({msg:"Password reset Token Expired"});
          }
  
          user.password = req.body.password;
          user.resetPasswordToken = undefined;
          user.resetPasswordExpires = undefined;
  
          bcrypt.genSalt(10 , (err , salt) => {
              if(err) throw err
              bcrypt.hash(user.password , salt , (err , hash) => {
                  user.password = hash
                  user.save(function(err) {
                      done(err , user)
                  })
              })
          })
        });
      },
      function(user, done) {
        var smtpTransport = nodemailer.createTransport({
            host: "smtp.mailtrap.io",
            port: 2525,
            auth: {
              user: "937236ce1a442d",
              pass: "6f7ef421db4b6c"
            }
          })
        var mailOptions = {
          to: user.email,
          from: 'ashishskkumar321@gmail.com',
          subject: 'Your password has been changed',
          text: 'Hello,\n\n' +
            'This is a confirmation that the password for your account ' + user.email + ' has just been changed.\n'
        };
        smtpTransport.sendMail(mailOptions, function(err) {
          done(err);
        });
      }
    ], function(err) {
      return res.status(505).send('server error')
    });
  });

  module.exports = router
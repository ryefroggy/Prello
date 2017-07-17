var express = require('express');
var router = express.Router();
var cors = require('../cors');
var User = require('../models/user');
var encrypt = require('password-hash');
var User_reset = require('../models/user_resets');

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('forgot_password', { title: 'Forgot Password' , path: 'stylesheets/forgot_password.css', js_path: "javascripts/forgot_password.js"});
});

router.post('/', cors, function(req, res) {
  User.findOne({email: req.body.email}, function(err, user) {
    if(!user) {
      res.send({error: "No account is associated with that email"});
    }
    else {
      var num = Math.round(Math.random() * 100);
      var hash = encrypt.generate(req.body.email, ['sha1', 8, num]);
      User_reset.findOne({username: user.username}, function(err2, user_res) {
        if(!user_res) {
          var newReset = User_reset({
            username: user.username,
            hash: hash
          });
          newReset.save(function(err, boards) {
            if(err) return handleError(err);
          });
        }
        else {
          user_res.update({hash: hash}, function(err3, updateduser) {
          });
        }
      });
      res.send({hash: hash});
    }
  });
});

router.get('/:HASH', function(req, res, next) {
  User_reset.findOne({hash: req.params.HASH}, function(err, user_res) {
    if(user_res) {
      res.render('reset_password', { title: 'Reset Password' , path: '/stylesheets/reset_password.css', js_path: "/javascripts/reset_password.js"});
    }
    else {
      res.status(404).send("Not found.");
    }
  });
});

router.post('/:HASH', function(req, res) {
  User_reset.findOne({hash: req.params.HASH}, function(err, user_res) {
    var pass_hash = encrypt.generate(req.body.password);
    User.findOne({username: user_res.username}, function(err, user) {
      user.update({password: pass_hash}, function(err, updateduser) {
        if(err) handleError(err);
        else {
          user_res.remove();
          res.send({success: "Password successfully updated!"});
        }
      });
    });
  });
});

module.exports = router;

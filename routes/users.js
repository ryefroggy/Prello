var express = require('express');
var mongoose = require('mongoose');
var User = require("../models/user")

var router = express.Router();

router.use(function (req, res, next) {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST');
  res.setHeader('Access-Control-Allow-Headers', 'Origin, X-requested-With, Content-Type, Accept');
  next();
});

router.get('/', function(req, res) {
  User.find({}, function(err, list) {
    res.json(list);
  });
});

router.post('/', function(req, res) {
  User.findOne({username: req.body.username}, function(err, user) {
    if(!user) {
      var newUser = new User({
        username: req.body.username,
        email: req.body.email,
        password: req.body.password
      });
      newUser.save(function(err2, list) {
        if(err2) {
          console.log(err2);
        }
        else {
          res.json(list);
        }
      });
      return res.redirect("/");
    }
  });
});

module.exports = router;

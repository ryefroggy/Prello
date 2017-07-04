var express = require('express');
var mongoose = require('mongoose');
var User = require("../models/user")
var session = require('client-sessions');

var router = express.Router();

router.use(function (req, res, next) {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST');
  res.setHeader('Access-Control-Allow-Headers', 'Origin, X-requested-With, Content-Type, Accept');
  next();
});

router.use(session({
  cookieName: 'session',
  secret: 'HairballGooseRyeFamily',
  duration: 30 * 60 * 1000,
  activeDuration: 5 * 60 * 1000,
  httpOnly: true,
  secure: true,
}));

router.get('/', function(req, res) {
  req.session.reset();
  res.json({});
});

module.exports = router;

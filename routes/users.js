var express = require('express');
var mongoose = require('mongoose');
var User = require("../models/user")
var session = require('client-sessions');
var sequelize = require('../db');
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
  User.find({}, function(err, list) {
    res.json(list);
  });
});

router.post('/', function(req, res) {
  var body = req.body;
  var query = `INSERT INTO users(username, email, password) VALUES
    ('${body.username}', '${body.email}', '${body.password}')`;
  sequelize.query(query, {type: sequelize.QueryTypes.INSERT})
    .then(function(user) {
      req.session.user = user[0];
      console.log(user);
      // res.status(201).json();
      res.redirect('/boards');
    });
});

router.post('/login', function(req,res) {
  var body = req.body;
  var query = `SELECT id, username, email
    FROM users
    WHERE username='${body.username}'
      AND password='${body.password}'
  `;

  sequelize.query(query, {type: sequelize.QueryTypes.SELECT})
    .then(function(user) {
      req.session.user = user[0];
      console.log(user);
      // res.status(201).json();
      res.redirect('/boards');
    });
});

module.exports = router;

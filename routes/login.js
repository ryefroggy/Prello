var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('login', { title: 'Login' , path: 'stylesheets/Prello_login.css', js_path: "javascripts/Prello_board.js"});
});

module.exports = router;

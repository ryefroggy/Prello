var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
  if(!req.user) {
    res.redirect('/login');
  }
  else {
    res.render('index', { title: 'Board' , path: 'stylesheets/Prello_board.css', js_path: "javascripts/Prello_board.js"});
  }
});

module.exports = router;

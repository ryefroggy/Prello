var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
  if(!req.session.user) {
    // res.redirect('/login');
  }
  else {
    res.render('boards', { title: 'Boards' , path: 'stylesheets/Prello_boards.css', js_path: "javascripts/Prello_boards.js"});
  }
});

module.exports = router;

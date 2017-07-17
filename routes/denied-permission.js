var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
  if(!req.user) {
    res.redirect('/login');
  }
  else {
    res.render('denied-permission', { title: 'Access Denied' , path: 'stylesheets/denied-permission.css', js_path: "javascripts/denied-permission.js"});
  }
});

module.exports = router;

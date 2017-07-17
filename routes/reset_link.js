var express = require('express');
var router = express.Router();
var User_reset = require('../models/user_resets');

/* GET home page. */
router.get('/:HASH', function(req, res, next) {
  User_reset.findOne({hash: req.params.HASH}, function(err, user) {
    if(user) {
      res.render('reset_link', { title: 'Reset Link' , path: '/stylesheets/reset_link.css', js_path: "", hash:"http://localhost:3000/forgot_password/"+req.params.HASH});
    }
    else {
      res.status(404).send("Not found.");
    }
  });
});

module.exports = router;

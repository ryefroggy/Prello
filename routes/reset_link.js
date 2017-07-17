var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/:HASH', function(req, res, next) {
  res.render('reset_link', { title: 'Reset Link' , path: '/stylesheets/reset_link.css', js_path: "", hash:"http://localhost:3000/forgot_password/"+req.params.HASH});
});

module.exports = router;

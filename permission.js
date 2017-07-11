var Board = require('./models/board');

var permission = function(req, res, next) {
  if(!req.user.username) {
    return res.redirect('/login');
  }
  Board.findById(req.params.BOARDID, function(err, board) {
    if(!board.members.includes(req.session.user.username)) {
      console.log("FAIL");
      return res.redirect('/denied-permission');
    }
  });
  next();
};

module.exports = permission;

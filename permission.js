var Board = require('./models/board');

var permission = function(req, res, next) {
  if(!req.user) {
    return res.redirect('/login');
  }
  Board.findById(req.params.BOARDID, function(err, board) {
    if(!board.members.includes(req.session.user.username)) {
      return res.redirect('/denied-permission');
    }
  });
  next();
};

module.exports = permission;

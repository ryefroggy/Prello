var express = require('express');
var mongoose = require('mongoose');
var Board = require('../models/board');
var User = require('../models/user');
var permission = require('../permission');
var io = require('../socketio');

var router = express.Router();

router.use(function (req, res, next) {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PATCH, DELETE');
  res.setHeader('Access-Control-Allow-Headers', 'Origin, X-requested-With, Content-Type, Accept');
  next();
});

/* GET home page. */
router.get('/', function(req, res) {
  Board.find({author: req.user.username}, function(err, boards) {
    if(err) return handleError(err);
    res.json(boards);
  });
});

router.post('/', function(req, res) {
  var newBoard = Board({
    name: req.body.name,
    author: req.user.username,
    members: [req.user.username]
  });
  newBoard.save(function(err, boards) {
    if(err) return handleError(err);
    res.json(newBoard);
  });
});

router.get('/:BOARDID', permission, function(req, res) {
  if(!req.user) {
    res.redirect('/login');
  }
  else {
    Board.findById(req.params.BOARDID, function(err, board) {
      res.render('index', { title: board.name, path: '../stylesheets/Prello_board.css', js_path: "../javascripts/Prello_board.js", username: req.user.username});
    });
  }
});

router.post('/:BOARDID/member', permission, function(req, res) {
  User.count({username: req.body.member}, function(err, num) {
    if(num == 0) {
      res.send({err: "User does not exist."});
    }
    else {
      Board.findById(req.params.BOARDID, function(err, board) {
        board.members.push(req.body.member);
        board.markModified("members");
        board.save(function(err2, updatedboard) {
          if(err2) handleError(err2);
          res.send(updatedboard);
        });
      });
    }
  });
});

router.get('/:BOARDID/list', permission, function(req, res) {
  Board.findById(req.params.BOARDID, function(err, board) {
    res.json(board.lists);
  });
});

router.post('/:BOARDID/list', permission, function(req, res) {
  Board.findById(req.params.BOARDID, function(err, board) {
    board.lists.push({name: req.body.name});
    board.save(function(err2, newboard) {
      if (err2) {
        console.log(err2);
      } else {
        res.json(board.lists[board.lists.length-1]);
      }
    });
  });
});

router.patch('/:BOARDID/list/:LISTID', permission, function (req, res) {
  Board.findById(req.params.BOARDID, function(err, board) {
    if (err) return handleError(err);
    board.lists(req.params.LISTID).name = req.body.name;
    board.save(function(err2, newboard) {
      if (err2) {
        console.log(err2);
      }
      else {
        res.json(newboard);
      }
    });
  });
});

router.delete('/:BOARDID/list/:LISTID', permission, function(req, res) {
  Board.findById(req.params.BOARDID, function(err, board) {
    if(err) return handleError(err);
    board.lists.id(req.params.LISTID).remove();
    board.save(function(err2, newboard) {
      if (err2) {
        console.log(err2);
      }
      else {
        res.json();
      }
    });
  });
});

router.post('/:BOARDID/list/:LISTID/card', permission, function(req, res) {
  Board.findById(req.params.BOARDID, function(err, board) {
    board.lists.id(req.params.LISTID).cards.push({
      title: req.body.title,
      author: req.user.username,
      members: [''],
      description: ""
    });
    board.save(function(err2, newboard) {
      if (err2) {
        console.log(err2);
      }
      else {
        var list = newboard.lists.id(req.params.LISTID);
        io.getInstance().emit('newCard', {for: 'everyone', list})
        res.json(newboard.lists.id(req.params.LISTID));
      }
    });
  });
});

router.patch('/:BOARDID/list/:LISTID/card/:CARDID', permission, function(req, res) {
  Board.findById(req.params.BOARDID, function (err, board) {
    if(err) return handleError(err);
    var card = board.lists.id(req.params.LISTID).cards.id(req.params.CARDID);
    card.title = req.body.title;
    card.description = req.body.description;
    card.members = req.body.members;
    board.save(function(err2, updatedboard) {
      if(err2) return handleError(err2);
      res.send(updatedboard);
    });
  });
});

router.delete('/:BOARDID/list/:LISTID/card/:CARDID', permission, function(req, res) {
  Board.findById(req.params.BOARDID, function(err, board) {
    if(err) return handleError(err);
    board.lists.id(req.params.LISTID).cards.id(req.params.CARDID).remove();
    board.save(function(err2, updatedboard) {
      if(err2) return handleError(err2);
      res.send();
    });
  });
});

router.post('/:BOARDID/list/:LISTID/card/:CARDID/comment', permission, function(req, res) {
  Board.findById(req.params.BOARDID, function(err, board) {
    if(err) return handleError(err);
    var card = board.lists.id(req.params.LISTID).cards.id(req.params.CARDID);
    card.comments.push({
      content: req.body.content,
      author: req.user.username,
      date: req.body.date,
    });
    board.save(function(err2, updatedboard) {
      if(err2) return handleError(err2);
      res.send(card.comments[card.comments.length-1]);
    });
  });
});

router.post('/:BOARDID/list/:LISTID/card/:CARDID/label', permission, function(req, res) {
  Board.findById(req.params.BOARDID, function(err, board) {
    var card = board.lists.id(req.params.LISTID).cards.id(req.params.CARDID);
    card.labels.push({
      name: req.body.name,
      color: req.body.color
    });
    board.save(function(err2, updatedboard) {
      if(err2) return handleError(err2);
      res.send(card.labels[card.labels.length-1]);
    });
  });
});

router.delete('/:BOARDID/list/:LISTID/card/:CARDID/label/:LABELID', permission, function(req, res) {
  Board.findById(req.params.BOARDID, function(err, board) {
    board.lists.id(req.params.LISTID).cards.id(req.params.CARDID).labels.id(req.params.LABELID).remove();
    board.save(function(err2, updatedboard) {
      if(err2) return handleError(err2);
      res.send();
    });
  });
});

module.exports = router;

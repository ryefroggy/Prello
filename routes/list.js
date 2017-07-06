var express = require('express');
var mongoose = require('mongoose');
var List = require('../models/list');
var Card = require('../models/card');
var Comment = require('../models/comment');

var router = express.Router();

router.use(function (req, res, next) {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PATCH, DELETE');
  res.setHeader('Access-Control-Allow-Headers', 'Origin, X-requested-With, Content-Type, Accept');
  next();
});

/* GET home page. */
router.get('/', function(req, res) {
  List.find({}, function(err, list) {
    res.json(list);
  });
});

router.post('/', function(req, res) {
  var newList = new List(
    {
      name: req.body.name
    }
  );
  newList.save(function (err, list) {
    if (err) {
      console.log(err);
    } else {
      res.json(list);
    }
  });
});

router.patch('/:LISTID', function (req, res) {
  List.findByIdAndUpdate(req.params.LISTID, { $set: { name: req.body.name }}, { new: true }, function (err, list) {
    if (err) return handleError(err);
    res.send(list);
  });
});

router.delete('/:LISTID', function(req, res) {
  List.findByIdAndRemove(req.params.LISTID, function(err) {
    if(err) return handleError(err);
    res.send();
  });
});

router.post('/:LISTID/card', function(req, res) {
  var newCard =  new Card({
    title: req.body.title,
    author: req.user.username,
    labels: [''],
    members: [''],
    description: "",
    comments: ['']
  });
  List.findById(req.params.LISTID, function (err, list) {
    if (err) return handleError(err);
    list.cards.push(newCard);
    list.save(function(err2, updatedlist) {
      if(err2) return handleError(err2);
      res.send(updatedlist);
    });
  });
});

router.patch('/:LISTID/card/:CARDID', function(req, res) {
  List.findById(req.params.LISTID, function(err, list) {
    if (err) return handleError(err);
    for(var i = 0; i < list.cards.length; i++) {
      if(list.cards[i]._id == req.params.CARDID) {
        var id = list.cards[i]._id;
        var us = list.cards[i].author;
        list.cards[i] = req.body;
        list.cards[i]._id = id;
        list.cards[i].author = us;
        list.markModified("cards");
        list.save(function(err2, updatedlist) {
          if(err2) return handleError(err2);
          res.send(updatedlist);
        });
        break;
      }
    }
  });
});

router.delete('/:LISTID/card/:CARDID', function(req, res) {
  List.findById(req.params.LISTID, function(err,list) {
    if(err) return handleError(err);
    for(var i = 0; i < list.cards.length; i++) {
      if(list.cards[i]._id == req.params.CARDID) {
        list.cards.splice(i, 1);
        list.markModified("cards");
        list.save(function(err2, updatedlist) {
          if(err2) return handleError(err2);
          res.send(updatedlist);
        });
        break;
      }
    }
  });
});

router.post('/:LISTID/card/:CARDID/comment', function(req, res) {
  List.findById(req.params.LISTID, function(err, list) {
    if(err) return handleError(err);
    for(var i = 0; i < list.cards.length; i++) {
      if(list.cards[i]._id == req.params.CARDID) {
        var newComment = new Comment({
          content: req.body.content,
          author: req.user.username,
          date: req.body.date,
        });
        if(list.cards[i].comments[0] === "") {
          list.cards[i].comments.splice(0,1);
        }
        list.cards[i].comments.push(newComment);
        list.markModified("cards");
        list.save(function(err2, updatedlist) {
          if(err2) return handleError(err2);
          res.send(newComment);
        });
        break;
      }
    }
  });
});

module.exports = router;

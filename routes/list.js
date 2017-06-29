var express = require('express');
var mongoose = require('mongoose');

var router = express.Router();

var List = mongoose.model('List',
  {
    name: String,
    cards: Array
  }
);

var Card = mongoose.model('Card',
  {
    title: String,
    labels: Array,
    members: Array,
    description: String
  }
);

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
    labels: [''],
    members: [''],
    description: ""
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
        list.cards[i] = req.body;
        list.cards[i]._id = id;
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

module.exports = router;

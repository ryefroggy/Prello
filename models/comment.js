var mongoose = require("mongoose");

var Schema = mongoose.Schema;

var schema = new Schema( {
  content: String,
  author: String,
  time: Date,
});

module.exports = mongoose.model('Comment', schema);

var mongoose = require("mongoose");
var Comment = require("./comment");

var Schema = mongoose.Schema;

var schema = new Schema( {
  title: String,
  author: String,
  labels: Array,
  members: Array,
  description: String,
  comments: Array
});

module.exports = mongoose.model('Card', schema);

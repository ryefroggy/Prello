var mongoose = require("mongoose");

var Schema = mongoose.Schema;

var schema = new Schema( {
  title: String,
  labels: Array,
  members: Array,
  description: String
});

module.exports = mongoose.model('Card', schema);

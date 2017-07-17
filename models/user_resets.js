var mongoose = require("mongoose");

var Schema = mongoose.Schema;

var schema = new Schema({
  username: String,
  hash: String
});

module.exports = mongoose.model('User_reset', schema);

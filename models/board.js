var mongoose = require("mongoose");
var List = require("./list");

var Schema = mongoose.Schema;

var schema = new Schema( {
  name: String,
  lists: [{type:mongoose.Schema.Types.ObjectId, ref: 'List'}],
  author: String
});

module.exports = mongoose.model('Board', schema);

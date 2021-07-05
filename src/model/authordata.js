const mongoose = require("mongoose");
// mongoose.connect('mongodb://localhost:27017/library');
mongoose.connect('mongodb+srv://abijith1:abijith1@cluster0.xvsfs.mongodb.net/LIBRARYAPP?retryWrites=true&w=majority');
const Schema = mongoose.Schema;
const AuthorSchema = new Schema({
  name: String,
  language: String,
  dob: String,
  img: String,
  content: String
});
var authordata = mongoose.model('authordata', AuthorSchema);
module.exports = authordata;
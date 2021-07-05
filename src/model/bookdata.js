const mongoose = require("mongoose");
// mongoose.connect('mongodb://localhost:27017/library');
mongoose.connect('mongodb+srv://abijith1:abijith1@cluster0.xvsfs.mongodb.net/LIBRARYAPP?retryWrites=true&w=majority');
const Schema = mongoose.Schema;
const BookSchema = new Schema({
  title: String,
  author: String,
  genre: String,
  img: String
});
var bookdata=mongoose.model('bookdata',BookSchema);
module.exports=bookdata;
const mongoose = require("mongoose");
// mongoose.connect('mongodb://localhost:27017/library');
mongoose.connect('mongodb+srv://abijith1:abijith1@cluster0.xvsfs.mongodb.net/LIBRARYAPP?retryWrites=true&w=majority');
const Schema = mongoose.Schema;
const UserSchema = new Schema({
  username: String,
  password: String,
  role: String
});
var userdata = mongoose.model('userdata', UserSchema);
module.exports = userdata;
const mongoose = require('mongoose');

const UserSchema = new mongoose.Schema({
  name: String,
  login: String,
  email: String,
});

module.exports = mongoose.model('User', UserSchema);

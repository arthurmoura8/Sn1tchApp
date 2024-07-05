const mongoose = require('mongoose');

const GroupSchema = new mongoose.Schema({
  class: String,
  name: String,
  period: String,
  discipline: String,
  githubRepo: String,
  googleDocsLink: String,
  members: [{ type: mongoose.Schema.Types.ObjectId, ref: 'User' }],
});

module.exports = mongoose.model('Group', GroupSchema);

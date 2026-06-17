const mongoose = require('mongoose');

const templateSchema = new mongoose.Schema({
  name: { type: String, required: true },
  structure: { type: String, default: '' },
  sections: [{ type: String }],
  createdAt: { type: Date, default: Date.now },
});

module.exports = mongoose.model('Template', templateSchema);

const mongoose = require('mongoose');

const clientSchema = new mongoose.Schema({
  name: { type: String, required: true },
  email: { type: String, required: true },
  company: { type: String, default: '' },
  phone: { type: String, default: '' },
  createdAt: { type: Date, default: Date.now },
});

module.exports = mongoose.model('Client', clientSchema);

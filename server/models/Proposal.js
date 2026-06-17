const mongoose = require('mongoose');

const proposalSchema = new mongoose.Schema({
  clientId: { type: mongoose.Schema.Types.ObjectId, ref: 'Client', required: true },
  title: { type: String, required: true },
  requirements: { type: String, default: '' },
  scope: { type: String, default: '' },
  timeline: { type: String, default: '' },
  budget: { type: Number, default: 0 },
  status: { type: String, enum: ['draft', 'sent', 'accepted', 'rejected'], default: 'draft' },
  createdAt: { type: Date, default: Date.now },
});

module.exports = mongoose.model('Proposal', proposalSchema);

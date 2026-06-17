const express = require('express');
const router = express.Router();
const Proposal = require('../models/Proposal');

router.get('/', async (req, res) => {
  try {
    const filter = {};
    if (req.query.clientId) filter.clientId = req.query.clientId;
    if (req.query.status) filter.status = req.query.status;
    const proposals = await Proposal.find(filter).populate('clientId').sort({ createdAt: -1 });
    res.json(proposals);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

router.get('/:id', async (req, res) => {
  try {
    const proposal = await Proposal.findById(req.params.id).populate('clientId');
    if (!proposal) return res.status(404).json({ message: 'Proposal not found' });
    res.json(proposal);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

router.post('/', async (req, res) => {
  try {
    const proposal = new Proposal(req.body);
    const saved = await proposal.save();
    res.status(201).json(saved);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

router.put('/:id', async (req, res) => {
  try {
    const proposal = await Proposal.findByIdAndUpdate(req.params.id, req.body, { new: true });
    res.json(proposal);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

router.delete('/:id', async (req, res) => {
  try {
    await Proposal.findByIdAndDelete(req.params.id);
    res.json({ message: 'Proposal deleted' });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

module.exports = router;

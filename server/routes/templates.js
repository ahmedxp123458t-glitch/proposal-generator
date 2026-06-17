const express = require('express');
const router = express.Router();
const Template = require('../models/Template');

router.get('/', async (req, res) => {
  try {
    const templates = await Template.find().sort({ name: 1 });
    res.json(templates);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

router.get('/:id', async (req, res) => {
  try {
    const template = await Template.findById(req.params.id);
    if (!template) return res.status(404).json({ message: 'Template not found' });
    res.json(template);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

router.post('/', async (req, res) => {
  try {
    const template = new Template(req.body);
    const saved = await template.save();
    res.status(201).json(saved);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

router.put('/:id', async (req, res) => {
  try {
    const template = await Template.findByIdAndUpdate(req.params.id, req.body, { new: true });
    res.json(template);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

router.delete('/:id', async (req, res) => {
  try {
    await Template.findByIdAndDelete(req.params.id);
    res.json({ message: 'Template deleted' });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

module.exports = router;

const express = require('express');
const cors = require('cors');
const { connectDB } = require('./config/db');

const app = express();
app.use(cors());
app.use(express.json());

app.use('/api/clients', require('./routes/clients'));
app.use('/api/proposals', require('./routes/proposals'));
app.use('/api/templates', require('./routes/templates'));

app.get('/', (req, res) => {
  res.json({ message: 'Proposal Generator API' });
});

const PORT = process.env.PORT || 5000;

connectDB().then(() => {
  app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
});

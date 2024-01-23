const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');

// Import your traffic light model
const TrafficLight = require('./models/TrafficLight');

// Use environment variables to store sensitive information
require('dotenv').config();

const app = express();

// Middleware to parse JSON bodies and enable CORS
app.use(express.json());
app.use(cors());

// MongoDB URI stored in .env file
const uri = process.env.MONGODB_URI;

// Connect to MongoDB
mongoose.connect(uri, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => console.log('MongoDB connection established.'))
  .catch(err => console.error('MongoDB connection error:', err));

// Define routes
// GET route to fetch the current traffic light status
app.get('/status', async (req, res) => {
  try {
    const status = await TrafficLight.findOne(); // Assuming there is only one traffic light
    res.json(status);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// POST route to update the traffic light status
app.post('/update', async (req, res) => {
  try {
    const { status } = req.body;
    await TrafficLight.findOneAndUpdate({}, { status }, { new: true, upsert: true });
    res.json({ message: 'Traffic light status updated successfully' });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// Set up the server to listen on a port
const PORT = process.env.PORT || 3001;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});

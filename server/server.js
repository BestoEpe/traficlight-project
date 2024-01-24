const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const TrafficLight = require('./models/TrafficLight'); // Adjust the path to your TrafficLight model
require('dotenv').config();
const cors = require('cors'); // Import the cors middleware

const app = express();
app.use(bodyParser.json());

// Enable CORS with specific options
app.use(cors({
  origin: 'http://localhost:3000', // Replace with your client's URL
  methods: 'GET,HEAD,PUT,PATCH,POST,DELETE',
  credentials: true, // Allow cookies and credentials to be sent cross-origin
}));

// Connect to MongoDB
mongoose.connect(process.env.MONGODB_URI, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => console.log('MongoDB connected'))
  .catch(err => console.error('MongoDB connection error:', err));

// POST route to update a specific traffic light's status
app.post('/api/traffic-lights/:lightId/update', async (req, res) => {
  const { lightId } = req.params;
  const { color } = req.body;

  try {
    const updatedLight = await TrafficLight.findOneAndUpdate(
      { lightId },
      { color },
      { new: true, upsert: true }
    );
    res.json(updatedLight);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

const port = process.env.PORT || 3000;
app.listen(port, () => console.log(`Server running on port ${port}`));

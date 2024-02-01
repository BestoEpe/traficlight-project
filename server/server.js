const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const TrafficLight = require('./models/TrafficLight');
require('dotenv').config();
const cors = require('cors');

const app = express();
app.use(bodyParser.json());
app.use(cors({
  origin: 'http://localhost:3000',
  methods: 'GET,HEAD,PUT,PATCH,POST,DELETE',
  credentials: true,
}));

mongoose.connect(process.env.MONGODB_URI, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => console.log('MongoDB connected'))
  .catch(err => console.error('MongoDB connection error:', err));

app.get('/api/traffic-lights/:lightId', async (req, res) => {
  const { lightId } = req.params;

  try {
    const trafficLight = await TrafficLight.findOne({ lightId });
    if (trafficLight) {
      res.status(200).json({ color: trafficLight.color, mode: trafficLight.mode, selectedTime: trafficLight.selectedTime });
    } else {
      res.status(404).json({ message: 'Traffic light not found' });
    }
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

app.post('/api/traffic-lights/:lightId/update', async (req, res) => {
  const { lightId } = req.params;
  const { color, mode, selectedTime } = req.body;

  try {
    const updatedLight = await TrafficLight.findOneAndUpdate(
      { lightId },
      { color, mode, selectedTime }, 
      { new: true, upsert: true }
    );

    res.json(updatedLight);
  } catch (err) {
    console.error('Error updating traffic light:', err);
    res.status(500).json({ message: err.message });
  }
});

const port = process.env.PORT || 3001;
app.listen(port, () => console.log(`Server running on port ${port}`));

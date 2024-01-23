// server/models/TrafficLight.js

const mongoose = require('mongoose');

const TrafficLightSchema = new mongoose.Schema({
  status: {
    type: String,
    enum: ['stop', 'wait', 'go'],
    required: true
  }
});

const TrafficLight = mongoose.model('TrafficLight', TrafficLightSchema);

module.exports = TrafficLight;

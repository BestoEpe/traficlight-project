const mongoose = require('mongoose');

const trafficLightSchema = new mongoose.Schema({
  lightId: String,
  color: String
});

module.exports = mongoose.model('TrafficLight', trafficLightSchema);

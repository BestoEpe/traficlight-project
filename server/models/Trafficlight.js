const mongoose = require('mongoose');

const trafficLightSchema = new mongoose.Schema({
  lightId: String,
  color: String,
  mode: String, // 'manual', 'normal', 'flickering'
});

module.exports = mongoose.model('TrafficLight', trafficLightSchema);

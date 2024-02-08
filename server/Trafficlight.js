const mongoose = require('mongoose');

const trafficLightSchema = new mongoose.Schema({
  lightId: String,
  color: String,
  mode: String,
  selectedTime: Number, 
});

module.exports = mongoose.model('TrafficLight', trafficLightSchema);

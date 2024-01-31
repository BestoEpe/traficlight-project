const mongoose = require('mongoose');

const trafficLightSchema = new mongoose.Schema({
  lightId: String,
  color: String,
  mode: String,
  timeOffStart: String, 
  timeOffEnd: String,  
});

module.exports = mongoose.model('TrafficLight', trafficLightSchema);

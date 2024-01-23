

import React from 'react';
import './TrafficLight.css';

const TrafficLight = ({ status }) => {
  return (
    <div className="traffic-light">
      <div className={`bulb red ${status === 'stop' && 'active'}`}></div>
      <div className={`bulb yellow ${status === 'wait' && 'active'}`}></div>
      <div className={`bulb green ${status === 'go' && 'active'}`}></div>
    </div>
    
    
  );
};

export default TrafficLight;

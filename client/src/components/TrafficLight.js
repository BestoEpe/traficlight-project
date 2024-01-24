import React from 'react';
import './TrafficLight.css'; // Make sure to create appropriate CSS

const TrafficLight = ({ lightId, color, updateLight }) => {
  const changeColor = (newColor) => {
    updateLight(lightId, newColor);
  };

  return (
    <div className="traffic-light-container">
      <div className="traffic-light">
        <div className={`light red ${color === 'red' ? 'active' : ''}`}></div>
        <div className={`light yellow ${color === 'yellow' ? 'active' : ''}`}></div>
        <div className={`light green ${color === 'green' ? 'active' : ''}`}></div>
      </div>
      <div className="traffic-light-controls">
        <button onClick={() => changeColor('red')}>Red</button>
        <button onClick={() => changeColor('yellow')}>Yellow</button>
        <button onClick={() => changeColor('green')}>Green</button>
      </div>
    </div>
  );
};

export default TrafficLight;

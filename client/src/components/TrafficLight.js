import React, { useState, useEffect } from 'react';
import './TrafficLight.css';

const TrafficLight = ({ lightId, updateLight }) => {
  const [color, setColor] = useState('off'); // Initialize with 'off' state
  const [startTime, setStartTime] = useState(8); // Default start time (e.g., 8 AM)
  const [endTime, setEndTime] = useState(18); // Default end time (e.g., 6 PM)
  const [selectedStartTime, setSelectedStartTime] = useState(0); // Initialize to 0 (midnight)
  const [selectedEndTime, setSelectedEndTime] = useState(0); // Initialize to 0 (midnight)
  const [presetMode, setPresetMode] = useState('default'); // Preset mode ('normal', 'off', 'default')
  const [isPresetsVisible, setIsPresetsVisible] = useState(false); // To control visibility of presets
  const [defaultColor, setDefaultColor] = useState('off'); // Default color for "default" preset

  const changeColor = (newColor) => {
    console.log(`Traffic Light ${lightId} changed to ${newColor}`);
    setColor(newColor);
  };
  
  

  const isFlickeringTime = () => {
    const currentHour = new Date().getHours();
    return currentHour >= startTime && currentHour < endTime;
  };

  const handleConfirmTime = () => {
    // Apply the selected start and end times
    setStartTime(selectedStartTime);
    setEndTime(selectedEndTime);
    setIsPresetsVisible(false); // Hide presets after confirming time
    setPresetMode('time'); // Switch to "time" mode
  };

  const handlePresetModeChange = (mode) => {
    // Handle preset mode changes
    setPresetMode(mode);

    // Depending on the mode, set the start and end times accordingly
    if (mode === 'normal') {
      setStartTime(8);
      setEndTime(18);
    } else if (mode === 'off') {
      setStartTime(0);
      setEndTime(0);
    } else if (mode === 'default') {
      startDefaultCycle();
    }
    setIsPresetsVisible(false); // Hide presets after selecting a mode
  };

  const togglePresetsVisibility = () => {
    setIsPresetsVisible((prev) => !prev);
  };

  const startDefaultCycle = () => {
    // Define an array of colors for the default cycle
    const defaultColors = ['red', 'green', 'yellow'];

    // Initialize the default color index
    let defaultColorIndex = 0;

    // Set the initial default color
    setDefaultColor(defaultColors[defaultColorIndex]);

    // Start a timer to cycle through colors every 5 seconds
    const cycleInterval = setInterval(() => {
      defaultColorIndex = (defaultColorIndex + 1) % defaultColors.length;
      setDefaultColor(defaultColors[defaultColorIndex]);
    }, 5000); // Change color every 5 seconds

    return () => clearInterval(cycleInterval);
  };

  useEffect(() => {
    if (isFlickeringTime()) {
      const flickeringInterval = setInterval(() => {
        setColor((prevColor) => (prevColor === 'yellow' ? 'off' : 'yellow'));
      }, 1000); // Adjust the interval duration as needed (e.g., 1000ms for flickering every second)

      return () => {
        clearInterval(flickeringInterval);
        setColor('off');
      };
    }
  }, [startTime, endTime]);

  useEffect(() => {
    // Initially set preset mode to 'default'
    setPresetMode('default');
    setIsPresetsVisible(true); // Show presets initially
  }, []);

  return (
    <div className="traffic-light-container">
      <div className="traffic-light">
        <div className={`light red ${(presetMode === 'default' && defaultColor === 'red') || color === 'red' ? 'active' : ''}`}></div>
        <div className={`light yellow ${(presetMode === 'default' && defaultColor === 'yellow') || color === 'yellow' ? 'active' : ''}`}></div>
        <div className={`light green ${(presetMode === 'default' && defaultColor === 'green') || color === 'green' ? 'active' : ''}`}></div>
      </div>
      <button onClick={togglePresetsVisibility}>
        {isPresetsVisible ? 'Close Presets' : 'Presets'}
      </button>
      {isPresetsVisible && (
        <div className="preset-container">
          <button onClick={() => handlePresetModeChange('normal')}>Time on</button>
          <button onClick={() => handlePresetModeChange('off')}>Time Off</button>
          <button onClick={() => handlePresetModeChange('default')}>Default</button>
          {presetMode !== 'off' && presetMode !== 'default' && (
            <>
              <label htmlFor={`timepicker-${lightId}`}>Select Time:</label>
              <input
                type="time"
                value={`${selectedStartTime.toString().padStart(2, '0')}:00`}
                onChange={(e) => setSelectedStartTime(parseInt(e.target.value))}
              />
              <span>to</span>
              <input
                type="time"
                value={`${selectedEndTime.toString().padStart(2, '0')}:00`}
                onChange={(e) => setSelectedEndTime(parseInt(e.target.value))}
              />
              <button onClick={handleConfirmTime}>Confirm Time</button>
            </>
          )}
        </div>
      )}
      {isFlickeringTime() && (
        <p className="flickering-indicator">Flickering Yellow</p>
      )}
      <div className="traffic-light-controls">
        <button onClick={() => changeColor('off')}>Off</button>
        <button onClick={() => changeColor('red')}>Red</button>
        <button onClick={() => changeColor('yellow')}>Yellow</button>
        <button onClick={() => changeColor('green')}>Green</button>
      </div>
    </div>
  );
};

export default TrafficLight;

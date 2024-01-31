import React, { useState, useEffect } from 'react';
import './TrafficLight.css';
import { fetchState, updateState, setTrafficLightTimeMode } from './TrafficStateHandler';
import { startNormalMode, startFlickeringMode, startTimeMode } from './TrafficModes'; // Import the startTimeMode function

const TrafficLight = ({ lightId }) => {
  const [color, setColor] = useState('off');
  const [mode, setMode] = useState(null);
  const [intervalId, setIntervalId] = useState(null);
  const [isDataFetched, setIsDataFetched] = useState(false);
  const [timeOffStart, setTimeOffStart] = useState('');
  const [timeOffEnd, setTimeOffEnd] = useState('');

  useEffect(() => {
    fetchState(lightId).then(data => {
      if (data) {
        setColor(data.color || 'off');
        setMode(data.mode || 'manual');
        setTimeOffStart(data.timeOffStart || '');
        setTimeOffEnd(data.timeOffEnd || '');
      }
      setIsDataFetched(true);
    }).catch(error => {
      console.error('Error retrieving last saved state:', error);
      setIsDataFetched(true);
    });
  }, [lightId]);

  useEffect(() => {
    if (intervalId) clearInterval(intervalId);

    if (mode === 'normal') {
      const newIntervalId = startNormalMode(setColor, setMode, lightId, updateState);
      setIntervalId(newIntervalId);
    } else if (mode === 'flickering') {
      const newIntervalId = startFlickeringMode(setColor, setMode, lightId, updateState);
      setIntervalId(newIntervalId);
    } else if (mode === 'time') {
      // Start the "time mode" interval
      const newIntervalId = startTimeMode(setColor, setMode, lightId, updateState, timeOffStart, timeOffEnd);
      setIntervalId(newIntervalId);
    } else if (mode === 'manual') {
      setColor(color);
    }
  }, [mode, isDataFetched, color, lightId, timeOffStart, timeOffEnd]); // Include timeOffStart and timeOffEnd in the dependency array

  if (!isDataFetched) {
    return <div>Loading...</div>;
  }

  const handleChangeColor = (newColor) => {
    if (intervalId) clearInterval(intervalId);
    setColor(newColor);
    setMode('manual');
    updateState(lightId, newColor, 'manual', null, null);
  };

  const handleSetMode = (newMode) => {
    if (intervalId) clearInterval(intervalId);
    if (newMode === 'normal') {
      const newIntervalId = startNormalMode(setColor, setMode, lightId, updateState);
      setIntervalId(newIntervalId);
    } else if (newMode === 'flickering') {
      const newIntervalId = startFlickeringMode(setColor, setMode, lightId, updateState);
      setIntervalId(newIntervalId);
    } else {
      setMode(newMode);
      setColor('off');
    }
  };

  const handleSetTimeMode = () => {
    if (intervalId) clearInterval(intervalId);

    // Ensure both time values are set before sending to the server
    if (timeOffStart && timeOffEnd) {
      setTrafficLightTimeMode(lightId, timeOffStart, timeOffEnd)
        .then(() => {
          setMode('time');
          setColor('off'); // Reset color when switching to time-based mode
        })
        .catch(error => console.error('Error setting time-based mode:', error));
    } else {
      console.error('Please set both start and end times for time-based mode.');
    }
  };

  return (
    <div>
      <div className="traffic-light">
        <div className={`light red ${color === 'red' ? 'active' : ''}`} />
        <div className={`light yellow ${color === 'yellow' ? 'active' : ''}`} />
        <div className={`light green ${color === 'green' ? 'active' : ''}`} />
      </div>
      {mode === 'manual' && (
        <div className="traffic-light-controls">
          <button onClick={() => handleChangeColor('red')}>Red</button>
          <button onClick={() => handleChangeColor('yellow')}>Yellow</button>
          <button onClick={() => handleChangeColor('green')}>Green</button>
        </div>
      )}
      <div className="mode-selection">
        <button onClick={() => handleSetMode('manual')}>Manual</button>
        <button onClick={() => handleSetMode('normal')}>Normal</button>
        <button onClick={() => handleSetMode('flickering')}>Flickering</button>
      </div>
      <div className="time-mode-selection">
        <input
          type="time"
          value={timeOffStart}
          onChange={(e) => setTimeOffStart(e.target.value)}
        />
        <input
          type="time"
          value={timeOffEnd}
          onChange={(e) => setTimeOffEnd(e.target.value)}
        />
        <button onClick={handleSetTimeMode}>Set Time Mode</button>
      </div>
    </div>
  );
};

export default TrafficLight;

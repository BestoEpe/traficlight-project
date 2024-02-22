import React, { useState, useEffect, useCallback } from 'react';
import './TrafficLight.css';
import { fetchState, updateState } from './TrafficStateHandler';
import { startNormalMode, startFlickeringMode } from './TrafficModes';

const TrafficLight = ({ lightId }) => {
  const [color, setColor] = useState('off');
  const [mode, setMode] = useState('manual');
  const [intervalId, setIntervalId] = useState(null);
  const [isDataFetched, setIsDataFetched] = useState(false);
  const [sliderValue, setSliderValue] = useState(0);
  const [selectedTime, setSelectedTime] = useState(null);
  const [remainingTime, setRemainingTime] = useState(0);

  const startTimer = useCallback((seconds) => {
    if (intervalId) clearInterval(intervalId);
    setColor('off');
    setMode('time');
    setRemainingTime(seconds);
    const newIntervalId = setInterval(() => {
      setRemainingTime(prevTime => {
        const newTime = prevTime - 1;
        if (newTime === 0) {
          clearInterval(newIntervalId);
          setMode('normal');
        }
        updateState(lightId, color, 'time', newTime);
        return newTime;
      });
    }, 1000);
    setIntervalId(newIntervalId);
  }, [intervalId, lightId, color]);

  useEffect(() => {
    fetchState(lightId).then(data => {
      if (data) {
        setColor(data.color || 'off');
        setMode(data.mode || 'manual');
        setSelectedTime(data.selectedTime || null);
        setRemainingTime(data.selectedTime || 0); 
        if (data.selectedTime && data.mode === 'time') {
          startTimer(data.selectedTime);
        }
      }
      setIsDataFetched(true);
    }).catch(error => {
      console.error('Error retrieving last saved state:', error);
      setIsDataFetched(true);
    });
  }, [lightId, startTimer]);

  useEffect(() => {
    if (intervalId) clearInterval(intervalId);

    if (mode === 'normal') {
      const newIntervalId = startNormalMode(setColor, setMode, lightId, updateState);
      setIntervalId(newIntervalId);
    } else if (mode === 'flickering') {
      const newIntervalId = startFlickeringMode(setColor, setMode, lightId, updateState);
      setIntervalId(newIntervalId);
    } else if (mode === 'manual') {
      setColor(color);
    } else if (mode === 'time' && remainingTime > 0) {
      startTimer(remainingTime);
    } else if (mode === 'time' && remainingTime === 0) {
      setMode('normal');
      setRemainingTime(0);
    }
  }, [mode, isDataFetched, color, lightId, selectedTime, remainingTime, intervalId, startNormalMode, startFlickeringMode, startTimer]);

  const handleChangeColor = (newColor) => {
    if (intervalId) clearInterval(intervalId);
    setColor(newColor);
    setMode('manual');
    updateState(lightId, newColor, 'manual');
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

  const handleSliderChange = (event) => {
    const value = parseInt(event.target.value);
    setSliderValue(value);
  };

  const sendSelectedTimeToDatabase = () => {
    if (selectedTime !== null) {
      console.log(`Selected time (${selectedTime} seconds) sent to the database.`);
      updateState(lightId, color, 'time', selectedTime);
    }
  };

  const handleConfirmTime = () => {
    if (sliderValue > 0) {
      setSelectedTime(sliderValue);
      setRemainingTime(sliderValue);
      startTimer(sliderValue);
      sendSelectedTimeToDatabase();
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
        <div>
          <input
            type="range"
            min="1"
            max="300"
            value={sliderValue}
            onChange={handleSliderChange}
          />
          <span>{sliderValue} second(s)</span>
        </div>
        <button onClick={handleConfirmTime}>Confirm Time</button>
        {mode === 'time' && (
          <div>
            <p>Time Remaining: {remainingTime} seconds</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default TrafficLight;

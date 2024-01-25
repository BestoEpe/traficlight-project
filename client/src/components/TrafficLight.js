import React, { useState, useEffect } from 'react';
import './TrafficLight.css';

const TrafficLight = ({ lightId }) => {
  const [color, setColor] = useState('off');
  const [mode, setMode] = useState(null); // Initialize mode as null
  const [intervalId, setIntervalId] = useState(null);
  const [isDataFetched, setIsDataFetched] = useState(false); // Track if data is fetched

  // Function to retrieve the last saved state from the server
  const getLastSavedState = async () => {
    console.log(`Fetching last saved state for lightId: ${lightId}`);
    try {
      const response = await fetch(`http://localhost:3001/api/traffic-lights/${lightId}`);
      if (response.status === 200) {
        const data = await response.json();
        console.log('Fetched data:', data);
        setColor(data.color || 'off');
        setMode(data.mode || 'manual');
        setIsDataFetched(true); // Indicate that data has been fetched
      } else {
        console.error(`Error fetching data: ${response.status} - ${response.statusText}`);
        setIsDataFetched(true);
      }
    } catch (error) {
      console.error('Error retrieving last saved state:', error);
      setIsDataFetched(true);
    }
  };

  useEffect(() => {
    getLastSavedState();
  }, []);

  // Updates the traffic light state on the server
  const updateTrafficLightState = async (newColor, newMode) => {
    console.log(`Updating state to color: ${newColor}, mode: ${newMode}`);
    try {
      const response = await fetch(`http://localhost:3001/api/traffic-lights/${lightId}/update`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ color: newColor, mode: newMode }),
      });
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      console.log('State updated successfully');
    } catch (error) {
      console.error('Error updating traffic light state:', error);
    }
  };

  // Changes the color and updates the mode (used in manual mode)
  const changeColor = (newColor) => {
    console.log(`Manual color change to: ${newColor}`);
    setColor(newColor);
    setMode('manual');
    updateTrafficLightState(newColor, 'manual');
  };

  // Starts the normal mode
  const startNormalMode = () => {
    console.log('Starting normal mode');
    const colors = ['red', 'green', 'yellow'];
    let index = 0;

    const id = setInterval(() => {
      const nextColor = colors[index];
      setColor(nextColor);
      updateTrafficLightState(nextColor, 'normal');
      index = (index + 1) % colors.length;
    }, 3000);

    setIntervalId(id);
  };

  // Starts the flickering yellow mode
  const startFlickeringMode = () => {
    console.log('Starting flickering mode');
    let isYellow = false;

    const id = setInterval(() => {
      const nextColor = isYellow ? 'off' : 'yellow';
      setColor(nextColor);
      updateTrafficLightState(nextColor, 'flickering');
      isYellow = !isYellow;
    }, 1000);

    setIntervalId(id);
  };

  // Effect for handling mode changes
  useEffect(() => {
    if (!isDataFetched) {
      return; // Do not proceed if data is not fetched yet
    }

    if (intervalId) {
      clearInterval(intervalId);
    }

    if (mode === 'normal') {
      startNormalMode();
    } else if (mode === 'flickering') {
      startFlickeringMode();
    } else if (mode === 'manual') {
      setColor(color); // Just reset the color to trigger update
    } else {
      setColor('off');
      updateTrafficLightState('off', mode);
    }
  }, [mode, isDataFetched]); // Add isDataFetched as a dependency

  if (!isDataFetched) {
    return <div>Loading...</div>;
  }

  return (
    <div>
      <div className="traffic-light">
        <div className={`light red ${color === 'red' ? 'active' : ''}`}></div>
        <div className={`light yellow ${color === 'yellow' ? 'active' : ''}`}></div>
        <div className={`light green ${color === 'green' ? 'active' : ''}`}></div>
      </div>
      {mode === 'manual' && (
        <div className="traffic-light-controls">
          <button onClick={() => changeColor('red')}>Red</button>
          <button onClick={() => changeColor('yellow')}>Yellow</button>
          <button onClick={() => changeColor('green')}>Green</button>
        </div>
      )}
      <div className="mode-selection">
        <button onClick={() => setMode('manual')}>Manual</button>
        <button onClick={() => setMode('normal')}>Normal</button>
        <button onClick={() => setMode('flickering')}>Flickering</button>
      </div>
    </div>
  );
};

export default TrafficLight;

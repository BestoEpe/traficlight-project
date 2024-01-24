import React, { useState } from 'react';
import TrafficLight from './components/TrafficLight'; // Adjust path as needed
import './App.css'; 

function App() {
  // Separate states for each traffic light
  const [light1Status, setLight1Status] = useState('red');
  const [light2Status, setLight2Status] = useState('red');
  const [light3Status, setLight3Status] = useState('red');

  const updateLightStatus = (lightId, newStatus) => {
    // Update the status of the specific traffic light
    if (lightId === 'light1') setLight1Status(newStatus);
    else if (lightId === 'light2') setLight2Status(newStatus);
    else if (lightId === 'light3') setLight3Status(newStatus);

    // Send update to the server using fetch
    fetch(`http://localhost:3001/api/traffic-lights/${lightId}/update`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ color: newStatus })
    })
    .then(response => {
      if (!response.ok) {
        throw new Error(`HTTP error! Status: ${response.status}`);
      }
      return response.json();
    })
    .then(data => {
      console.log('Success:', data);
    })
    .catch(error => {
      console.error('Error:', error);
    });
  };

  return (
    <div className="App">
      <TrafficLight lightId="light1" color={light1Status} updateLight={updateLightStatus} />
      <TrafficLight lightId="light2" color={light2Status} updateLight={updateLightStatus} />
      <TrafficLight lightId="light3" color={light3Status} updateLight={updateLightStatus} />
    </div>
  );
}

export default App;

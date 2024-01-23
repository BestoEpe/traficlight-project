/* client/src/components/TrafficLightContainer.js

import React, { useState, useEffect } from 'react';
import TrafficLight from './TrafficLight';
import axios from 'axios';

const TrafficLightContainer = () => {
  const [trafficLights, setTrafficLights] = useState([]);
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    axios.get('http://localhost:3001/status')
      .then(response => {
        console.log("Traffic lights data from API:", response.data); // Debugging
        setTrafficLights(response.data);
        setLoading(false);
      })
      .catch(error => {
        console.error('Error fetching traffic light status', error);
        setError('Failed to fetch traffic light status.');
        setLoading(false);
      });
  }, []);

  if (loading) return <p>Loading...</p>;
  if (error) return <p>{error}</p>;

  console.log("Rendered traffic lights:", trafficLights); // Debugging

  return (
    <div>
      {trafficLights.map(light => {
        console.log(`Rendering traffic light with ID: ${light._id}`, light);
        return <TrafficLight key={light._id} light={light} />;
        
      })}
    </div>
  );
};

export default TrafficLightContainer;
*/
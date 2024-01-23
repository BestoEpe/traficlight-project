// client/src/components/ControlPanel.js

import React from 'react';
import axios from 'axios';

const ControlPanel = ({ setStatus }) => {
  const sendStatusUpdate = (newStatus) => {
    setStatus(newStatus);
    axios.post('http://localhost:3001/update', { status: newStatus })
      .then(response => {
        console.log(response.data);
      })
      .catch(error => {
        console.error('There was an error updating the status', error);
      });
  };

  return (
    <div className="control-panel">
      <button onClick={() => sendStatusUpdate('stop')}>Stop</button>
      <button onClick={() => sendStatusUpdate('wait')}>Wait</button>
      <button onClick={() => sendStatusUpdate('go')}>Go</button>
    </div>
  );
};

export default ControlPanel;

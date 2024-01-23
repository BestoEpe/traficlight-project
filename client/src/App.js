// client/src/App.js

import React, { useState } from 'react';
import './App.css';
import TrafficLight from './components/TrafficLight';
import ControlPanel from './components/ControlPanel';

function App() {
  const [status, setStatus] = useState('stop');

  return (
    <div className="App">
      <TrafficLight status={status} />
      <ControlPanel setStatus={setStatus} />
    </div>
  );
}

export default App;

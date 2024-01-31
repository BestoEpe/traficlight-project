

export async function fetchState(lightId) {
    const response = await fetch(`http://localhost:3001/api/traffic-lights/${lightId}`);
    if (response.status !== 200) {
      throw new Error(`Error fetching data: ${response.status} - ${response.statusText}`);
    }
    return await response.json();
  }
  
  export async function updateState(lightId, color, mode, timeOffStart, timeOffEnd) {
    const response = await fetch(`http://localhost:3001/api/traffic-lights/${lightId}/update`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ color, mode, timeOffStart, timeOffEnd }),
    });
  
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
  
    return response.json();
  }
  
  export async function setTrafficLightTimeMode(lightId, timeOffStart, timeOffEnd) {
    try {
      const startTime = new Date(new Date().toDateString() + ' ' + timeOffStart);
      const endTime = new Date(new Date().toDateString() + ' ' + timeOffEnd);
  
      const response = await fetch(`http://localhost:3001/api/traffic-lights/${lightId}/update`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ timeOffStart: startTime.toISOString(), timeOffEnd: endTime.toISOString() }),
      });
  
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
  
      console.log('Time-based mode saved successfully');
      return response.json();
    } catch (error) {
      console.error('Error setting time-based mode:', error);
      throw error; // Rethrow the error for handling in the component
    }
  }
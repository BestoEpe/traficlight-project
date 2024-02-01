export async function fetchState(lightId) {
  const response = await fetch(`http://localhost:3001/api/traffic-lights/${lightId}`);
  if (response.status !== 200) {
    throw new Error(`Error fetching data: ${response.status} - ${response.statusText}`);
  }
  return await response.json();
}

export async function updateState(lightId, color, mode, selectedTime) {
  const response = await fetch(`http://localhost:3001/api/traffic-lights/${lightId}/update`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ color, mode, selectedTime }),
  });

  if (!response.ok) {
    throw new Error(`HTTP error! status: ${response.status}`);
  }

  return response.json();
}

// Functions for handling the normal and flickering modes of the traffic light

export function startNormalMode(setColor, setMode, lightId, updateState) {
    // Start the normal mode sequence
    const colors = ['red', 'green', 'yellow'];
    let index = 0;
  
    const intervalId = setInterval(async () => {
      const nextColor = colors[index];
      await updateState(lightId, nextColor, 'normal', null, null);
      setColor(nextColor);
      index = (index + 1) % colors.length;
    }, 3000);
  
    setMode('normal');
    return intervalId;
  }
  
  export function startFlickeringMode(setColor, setMode, lightId, updateState) {
    // Start the flickering mode
    let isYellow = false;
  
    const intervalId = setInterval(async () => {
      const nextColor = isYellow ? 'off' : 'yellow';
      await updateState(lightId, nextColor, 'flickering', null, null);
      setColor(nextColor);
      isYellow = !isYellow;
    }, 1000);
  
    setMode('flickering');
    return intervalId;
  }
  

  export function startTimeMode(setColor, setMode, lightId, updateState, timeOffStart, timeOffEnd) {
    // Convert timeOffStart and timeOffEnd to Date objects for comparison
    const offStartTime = timeStringToDate(timeOffStart);
    const offEndTime = timeStringToDate(timeOffEnd);
  
    let intervalId = setInterval(async () => {
      const currentTime = new Date();
      // Check if current time is within the off period
      if (currentTime >= offStartTime && currentTime <= offEndTime) {
        // If within off time, turn the light off
        await updateState(lightId, 'off', 'time', timeOffStart, timeOffEnd);
        setColor('off');
      } else {
        await updateState(lightId, 'green', 'time', timeOffStart, timeOffEnd);
        if (currentTime > offEndTime) {
          setMode('normal');
          console.log("time over");
        }
      }
    }, 60000); // Check every minute. Adjust as necessary for your use case.
  
    setMode('time');
    return intervalId;
  }
  
  function timeStringToDate(timeString) {
    const [hours, minutes] = timeString.split(':').map(Number);
    const date = new Date();
    date.setHours(hours, minutes, 0, 0);
    return date;
  }
  
  
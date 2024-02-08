export function startNormalMode(setColor, setMode, lightId, updateState) {
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


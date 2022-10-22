const renderLoop = {};

let previousTimeStamp = 0;
let frameId = 0;
let storedOnFrameFunctions;

renderLoop.start = (onFrameFunctions) => {
  storedOnFrameFunctions = onFrameFunctions;
  frameId = requestAnimationFrame((timeStamp) => {
    rerender(timeStamp, onFrameFunctions);
  });
  renderLoop.paused = false;
};

renderLoop.restart = () => {
  renderLoop.start(storedOnFrameFunctions);
  renderLoop.paused = false;
};

renderLoop.stop = () => {
  window.cancelAnimationFrame(frameId);
  // This prevent a massive build up of milliseconds in the delta causing animations to jump
  previousTimeStamp = 0;
  renderLoop.paused = true;
};

// Action happens in here
const rerender = (timeStamp, onFrameFunctions) => {
  // Prevents an error on the first frame when there is no previous time stamp
  if (!previousTimeStamp) {
    previousTimeStamp = timeStamp;
  }

  // Delta is used to smooth out variations in frame rate
  const delta = timeStamp - previousTimeStamp;
  previousTimeStamp = timeStamp;

  // All the work happens in per frame functions
  onFrameFunctions(delta);

  // Start loop again
  renderLoop.start(onFrameFunctions);
};

export { renderLoop };

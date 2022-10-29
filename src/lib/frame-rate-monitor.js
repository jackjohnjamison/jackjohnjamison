const monitorWidth = 150;
const monitorHeight = 70;
const deltaMaxMeasure = 100;

const frameRateMonitor = () => {
  const monitor = document.createElement("canvas");
  const monitorCtx = monitor.getContext("2d", { willReadFrequently: true });
  monitor.classList.add("monitor");

  monitor.width = monitorWidth;
  monitor.height = monitorHeight;

  canvasRoot.appendChild(monitor);

  monitorCtx.strokeStyle = "#ff0000";

  let previousState = monitorCtx.getImageData(
    0,
    0,
    monitorWidth,
    monitorHeight
  );

  return (delta) => {
    monitorCtx.clearRect(0, 0, monitorWidth, monitorHeight);

    monitorCtx.putImageData(previousState, -1, 0);

    const deltaLineTop =
      monitorHeight - (delta / deltaMaxMeasure) * monitorHeight;

    monitorCtx.beginPath();
    monitorCtx.moveTo(monitorWidth, monitorHeight);
    monitorCtx.lineTo(monitorWidth, deltaLineTop);

    monitorCtx.stroke();

    previousState = monitorCtx.getImageData(0, 0, monitorWidth, monitorHeight);
  };
};

export { frameRateMonitor };

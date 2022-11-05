const monitorWidth = 150;
const monitorHeight = 70;
const deltaMaxMeasure = 100;

const frameRateMonitor = () => {
  const monitor = document.createElement("canvas");
  const monitorCtx = monitor.getContext("2d");
  monitor.classList.add("monitor");

  monitor.width = monitorWidth;
  monitor.height = monitorHeight;

  canvasRoot.appendChild(monitor);
  monitorCtx.strokeStyle = "#ff0000";

  return (delta) => {
    monitorCtx.globalCompositeOperation = "copy";
    monitorCtx.drawImage(monitor, -1, 0);
    monitorCtx.globalCompositeOperation = "source-over";

    const deltaLineTop =
      monitorHeight - (delta / deltaMaxMeasure) * monitorHeight;

    monitorCtx.beginPath();
    monitorCtx.moveTo(monitorWidth, monitorHeight);
    monitorCtx.lineTo(monitorWidth, deltaLineTop);
    monitorCtx.stroke();
  };
};

export { frameRateMonitor };

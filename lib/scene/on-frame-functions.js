import { scene } from ".";
import { renderFrame } from "./render-frame";

// Functions fed into the render loop
const onFrameFunctions = (delta) => {
  const { onFrameControls } = scene;

  if (onFrameControls) {
    onFrameControls(delta);
    scene.monitor(delta);
  }

  renderFrame(delta);
};

export { onFrameFunctions };

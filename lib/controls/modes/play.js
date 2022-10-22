import { panCameraTo, scene } from "../../scene";

const playMode = {};
const noop = () => {};

playMode.set = () => {
  scene.onFrameControls = () => {
    // Camera move
    const { canvas, player } = scene;
    const { position } = player;
    const camerCentreX = Math.round(canvas.width / 2 - position.x);
    const camerCentreY = Math.round(canvas.height / 2 - position.y);
    panCameraTo(camerCentreX, camerCentreY);
  };
};

playMode.unset = () => {
  scene.onFrameControls = noop;
};

export { playMode };

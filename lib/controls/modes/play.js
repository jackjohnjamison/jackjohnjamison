import { panCameraTo, scene } from "../../scene";
import { findHoveredTile } from "../../map";

const playMode = {};
const noop = () => {};

playMode.set = () => {
  const { mouse } = scene;

  scene.onFrameControls = () => {
    // Camera move
    const { canvas, player } = scene;
    const { position } = player;
    const camerCentreX = Math.round(canvas.width / 2 - position.x);
    const camerCentreY = Math.round(canvas.height / 2 - position.y);
    panCameraTo(camerCentreX, camerCentreY);
  };

  mouse.onMouseUp = () => {
    console.log(findHoveredTile({ x: mouse.x, y: mouse.y }));
  };
};

playMode.unset = () => {
  scene.onFrameControls = noop;
  scene.mouse.onMouseUp = noop;
};

export { playMode };

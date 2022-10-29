import { scene } from ".";
import { keyCheck } from "../controls";
import { friction, cameraAcceleration } from "../constants";

let velocityX = 0;
let velocityY = 0;

const panCameraKeys = (delta) => {
  const { translate } = scene.view;

  const arrowUp = keyCheck("KeyW");
  const arrowDown = keyCheck("KeyS");
  const arrowRight = keyCheck("KeyD");
  const arrowLeft = keyCheck("KeyA");

  velocityX += cameraAcceleration * delta * (arrowRight - arrowLeft);
  velocityY += cameraAcceleration * delta * (arrowDown - arrowUp);

  translate.x -= velocityX;
  translate.y -= velocityY;

  translate.x = Math.round(translate.x);
  translate.y = Math.round(translate.y);

  velocityX *= friction;
  velocityY *= friction;

  scene.ctx.setTransform(1, 0, 0, 1, translate.x, translate.y);
};

// TODO auto scroll function for when the player nears the edges of the map
const panCameraTo = (x, y) => {
  const { translate } = scene.view;
  translate.x = Math.round(x);
  translate.y = Math.round(y);
  scene.ctx.setTransform(1, 0, 0, 1, x, y);
};

export { panCameraKeys, panCameraTo };

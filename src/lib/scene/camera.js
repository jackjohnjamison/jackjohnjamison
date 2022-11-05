import { scene } from ".";
import { keyCheck } from "../controls";
import { friction, cameraAcceleration } from "../constants";

let velocityX = 0;
let velocityY = 0;

const panCameraKeys = (delta) => {
  const {
    ctx1,
    view: { translate },
  } = scene;

  const arrowUp = keyCheck("KeyW");
  const arrowDown = keyCheck("KeyS");
  const arrowRight = keyCheck("KeyD");
  const arrowLeft = keyCheck("KeyA");

  velocityX += cameraAcceleration * delta * (arrowRight - arrowLeft);
  velocityY += cameraAcceleration * delta * (arrowDown - arrowUp);

  translate.x -= velocityX;
  translate.y -= velocityY;

  velocityX *= friction;
  velocityY *= friction;

  ctx1.setTransform(1, 0, 0, 1, translate.x, translate.y);
};

// TODO auto scroll function for when the player nears the edges of the map
// THIS FUNCTION WORKS BECAUSE THE FUNCTION ABOVE IS RUN ON EVERY FRAME
const panCameraTo = (x, y) => {
  const {
    view: { translate },
  } = scene;

  translate.x = x;
  translate.y = y;
};

export { panCameraKeys, panCameraTo };

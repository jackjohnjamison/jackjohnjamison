import { scene } from ".";
import { keyCheck } from "../controls";
import { friction, cameraAcceleration } from "../constants";

let velocityX = 0;
let velocityY = 0;

const panCameraKeys = (delta) => {
  const { view, floorCtx, midCtx, entityCtx, topCtx } = scene;
  const { translate } = view;

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

  floorCtx.setTransform(1, 0, 0, 1, translate.x, translate.y);
  midCtx.setTransform(1, 0, 0, 1, translate.x, translate.y);
  entityCtx.setTransform(1, 0, 0, 1, translate.x, translate.y);
  topCtx.setTransform(1, 0, 0, 1, translate.x, translate.y);
};

// TODO auto scroll function for when the player nears the edges of the map
const panCameraTo = (x, y) => {
  const { view, floorCtx, midCtx, entityCtx, topCtx } = scene;
  const { translate } = view;

  console.log(x);

  translate.x = Math.round(x);
  translate.y = Math.round(y);

  floorCtx.setTransform(1, 0, 0, 1, x, y);
  floorCtx.globalCompositeOperation = "copy";
  floorCtx.drawImage(floorCtx.canvas, 0, 0);
  floorCtx.globalCompositeOperation = "source-over";

  midCtx.setTransform(1, 0, 0, 1, x, y);
  entityCtx.setTransform(1, 0, 0, 1, x, y);
  topCtx.setTransform(1, 0, 0, 1, x, y);
};

export { panCameraKeys, panCameraTo };

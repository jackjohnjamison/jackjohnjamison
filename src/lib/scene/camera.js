import { scene } from ".";
import { keyCheck } from "../controls";
import { friction, cameraAcceleration } from "../constants";

let velocityX = 0;
let velocityY = 0;
let translatePrevious = {};

const panCameraKeys = (delta) => {
  const {
    view,
    floorCtx,
    floorCanvas,
    midCtx,
    entityCtx,
    entityCanvas,
    topCtx,
  } = scene;
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
  floorCtx.globalCompositeOperation = "copy";
  floorCtx.drawImage(floorCanvas, -translatePrevious.x, -translatePrevious.y);
  floorCtx.globalCompositeOperation = "source-over";

  midCtx.setTransform(1, 0, 0, 1, translate.x, translate.y);

  entityCtx.setTransform(1, 0, 0, 1, translate.x, translate.y);
  entityCtx.globalCompositeOperation = "copy";
  entityCtx.drawImage(entityCanvas, -translatePrevious.x, -translatePrevious.y);
  entityCtx.globalCompositeOperation = "source-over";

  topCtx.setTransform(1, 0, 0, 1, translate.x, translate.y);

  translatePrevious = {
    x: translate.x,
    y: translate.y,
  };
};

// TODO auto scroll function for when the player nears the edges of the map
// THIS FUNCTION WORKS BECAUSE THE FUNCTION ABOVE IS RUN ON EVERY FRAME
const panCameraTo = (x, y) => {
  const { view } = scene;
  const { translate } = view;

  translate.x = x;
  translate.y = y;
};

export { panCameraKeys, panCameraTo };

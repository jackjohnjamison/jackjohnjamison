import { scene } from ".";
import { keyCheck } from "../controls";
import { friction, cameraAcceleration } from "../constants";

let velocityX = 0;
let velocityY = 0;

const translatePrevious = { x: 0, y: 0 };

const panCameraKeys = (delta) => {
  const {
    ctxMid,
    ctxTop,
    floorCanvas,
    entityCanvas,
    view: { translate },
  } = scene;

  const arrowUp = keyCheck("KeyW");
  const arrowDown = keyCheck("KeyS");
  const arrowRight = keyCheck("KeyD");
  const arrowLeft = keyCheck("KeyA");

  velocityX += cameraAcceleration * delta * (arrowRight - arrowLeft);
  velocityY += cameraAcceleration * delta * (arrowDown - arrowUp);

  translate.x = Math.round(translate.x - velocityX);
  translate.y = Math.round(translate.y - velocityY);

  if (
    translate.x !== translatePrevious.x ||
    translate.y !== translatePrevious.y
  ) {
    floorCanvas.style.left = entityCanvas.style.left = `${translate.x}px`;
    floorCanvas.style.top = entityCanvas.style.top = `${translate.y}px`;

    ctxMid.setTransform(1, 0, 0, 1, translate.x, translate.y);
    ctxTop.setTransform(1, 0, 0, 1, translate.x, translate.y);

    translatePrevious.x = translate.x;
    translatePrevious.y = translate.y;

    scene.redrawEffects = true;
  }

  velocityX *= friction;
  velocityY *= friction;
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

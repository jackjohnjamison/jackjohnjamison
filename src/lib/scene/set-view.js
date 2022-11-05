import { scene } from ".";
import { tileWidth, tileHeight, paddingBottom, paddingTop } from "../constants";

const setView = ({ xTiles, yTiles }) => {
  const {
    ctx2,
    ctx4,
    canvas2,
    entityCanvas,
    canvas4,
    canvasRoot,
    floorCanvas,
  } = scene;

  const baseHeight = ((xTiles + yTiles) / 2) * tileHeight;

  // Canvas dimensions once padding is included
  const width = ((xTiles + yTiles) / 2) * tileWidth;
  const height = baseHeight + paddingBottom + paddingTop;

  // Sets floor and entity canvas size
  floorCanvas.width = entityCanvas.width = width;
  floorCanvas.height = entityCanvas.height = height;

  // The exactly fits the grid in the center on the Y axis
  const baseOriginY =
    baseHeight / 2 -
    (tileHeight / 4) * (yTiles - xTiles) -
    tileHeight / 2 +
    paddingTop;

  // Used to caculate the position of the grid relative to the canvas
  const origin = {
    x: 0,
    y: baseOriginY,
  };

  const translate = {
    x: 0,
    y: 0,
  };

  const setApertureSize = () => {
    canvas2.width = canvas4.width = canvasRoot.clientWidth;
    canvas2.height = canvas4.height = canvasRoot.clientHeight;

    ctx2.setTransform(1, 0, 0, 1, translate.x, translate.y);
    ctx4.setTransform(1, 0, 0, 1, translate.x, translate.y);
  };

  onresize = () => {
    setApertureSize();
  };

  return {
    origin,
    xTiles,
    yTiles,
    translate,
    setApertureSize,
  };
};

export { setView };

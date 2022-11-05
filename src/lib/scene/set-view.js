import { scene } from ".";
import { tileWidth, tileHeight, paddingBottom, paddingTop } from "../constants";

const setView = ({ xTiles, yTiles }) => {
  const {
    canvasRoot,
    floorCtx,
    ctxMid,
    entityCtx,
    ctxTop,
    floorCanvas,
    canvasMid,
    entityCanvas,
    canvasTop,
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
    canvasMid.width = canvasTop.width = canvasRoot.clientWidth;
    canvasMid.height = canvasTop.height = canvasRoot.clientHeight;

    ctxMid.setTransform(1, 0, 0, 1, translate.x, translate.y);
    ctxMid.imageSmoothingEnabled = false;
    ctxTop.setTransform(1, 0, 0, 1, translate.x, translate.y);
    ctxTop.imageSmoothingEnabled = false;

    floorCtx.imageSmoothingEnabled = false;
    entityCtx.imageSmoothingEnabled = false;
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

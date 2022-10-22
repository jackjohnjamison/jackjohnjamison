import { scene } from "../scene";
import { getSpriteImage } from "../sprites";
import { drawLineTile } from ".";
import { hoveredTileColor, tileWidth, tileHeight } from "../constants";

const drawImageTile = ({ x, y, image }) => {
  const { floorCtx } = scene;
  const position = tileIndexToPosition({ x, y });

  floorCtx.drawImage(image.data, position.x, position.y - image.yOffset);
};

const renderGrid = (x, y) => {
  const { tileMap } = scene; //
  const tile = tileMap.tiles[x][y];

  if (tile.floor) {
    const { set, color, variant } = tile.floor;

    drawImageTile({
      x,
      y,
      image: getSpriteImage(set, color, variant),
    });
  }
};

const positionToTileIndex = ({ x, y }) => {
  const { origin } = scene.view;

  return {
    x: Math.floor(
      (x - origin.x) / tileWidth - (y - origin.y - tileHeight / 2) / tileHeight
    ),
    y: Math.floor(
      (y - origin.y - tileHeight / 2) / tileHeight + (x - origin.x) / tileWidth
    ),
  };
};

const tileIndexToPosition = ({ x, y }) => {
  const { origin } = scene.view;

  return {
    x: (x * tileWidth) / 2 + (y * tileWidth) / 2 + origin.x,
    y: (y * tileHeight) / 2 - (x * tileHeight) / 2 + origin.y,
  };
};

const findHoveredTile = (position) => {
  const { tileMap } = scene;
  const { x, y } = positionToTileIndex(position);

  if (tileMap.tiles[x] && tileMap.tiles[x][y]) {
    return { x, y };
  } else {
    return null;
  }
};

const highlightTile = (tileIndex, strokeColor) => {
  const { x, y } = tileIndex;

  drawLineTile({
    x,
    y,
    strokeColor: strokeColor,
    fillColor: hoveredTileColor,
  });
};

export {
  drawImageTile,
  renderGrid,
  findHoveredTile,
  highlightTile,
  positionToTileIndex,
  tileIndexToPosition,
};

import { scene } from "../scene";
import { positionToTileIndex, tileIndexToPosition, highlightTile } from ".";
import {
  tileWidth,
  tileHeight,
  tileHalfWidth,
  tileHalfHeight,
  tileDimensionRatio,
} from "../constants";

const tileOverCount = 5;

const loopTiles = (startTile, rows, columns) => {
  for (let j = 0; j < columns; j++) {
    for (let i = -1; i < rows; i++) {
      const xOffset = -Math.floor(j / 2) + 1;
      const yOffset = Math.ceil(j / 2);

      const tile = {
        x: startTile.x + i + xOffset,
        y: startTile.y + i + yOffset,
      };

      highlightTile(tile, "orange");
    }
  }
};

const rectangularTileSelection = (originX, originY, areaWidth, areaHeight) => {
  const startTile = positionToTileIndex({ x: originX, y: originY });
  const rows = Math.ceil((areaWidth + tileHalfWidth) / tileWidth);
  const columns = Math.ceil(areaHeight / tileHalfHeight) + tileOverCount;

  loopTiles(startTile, rows, columns);
};

const horizontalTileSelection = (originX, originY, areaWidth) => {
  const startTile = positionToTileIndex({ x: originX, y: originY });
  const rows = Math.ceil((areaWidth + tileHalfWidth) / tileWidth);

  loopTiles(startTile, rows, tileOverCount);
};

export { rectangularTileSelection, horizontalTileSelection };

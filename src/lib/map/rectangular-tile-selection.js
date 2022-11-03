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

const loopTiles = (startTile, columns, rows) => {
  for (let j = 0; j < rows; j++) {
    const xOffset = -Math.floor(j / 2) + 1;
    const yOffset = Math.ceil(j / 2);

    // console.log(startTile.x, xOffset);s
    console.log(startTile.y, yOffset);

    const indexStart = Math.max(-1, -startTile.x - xOffset);

    for (let i = indexStart; i < columns; i++) {
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
  const columns = Math.ceil((areaWidth + tileHalfWidth) / tileWidth);
  const rows = Math.ceil(areaHeight / tileHalfHeight) + tileOverCount;

  loopTiles(startTile, columns, rows);
};

const horizontalTileSelection = (originX, originY, areaWidth) => {
  const startTile = positionToTileIndex({ x: originX, y: originY });
  const columns = Math.ceil((areaWidth + tileHalfWidth) / tileWidth);

  loopTiles(startTile, tileOverCount, columns);
};

export { rectangularTileSelection, horizontalTileSelection };

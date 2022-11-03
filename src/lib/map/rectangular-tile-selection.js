import { positionToTileIndex, tileIndexToPosition, highlightTile } from ".";
import {
  tileWidth,
  tileHeight,
  tileHalfWidth,
  tileHalfHeight,
  tileDimensionRatio,
} from "../constants";

const rectangularTileSelection = (originX, originY, areaWidth, areaHeight) => {
  const startTile = positionToTileIndex({ x: originX, y: originY });
  const bottomPaddingTileCount = 5;
  const rowTileCount = Math.ceil(areaWidth / tileWidth);
  const columnTileCount =
    Math.ceil(areaHeight / tileHalfHeight) + bottomPaddingTileCount;

  for (let i = -1; i < rowTileCount; i++) {
    for (let j = 0; j < columnTileCount; j++) {
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

const horizontalTileSelection = (originX, originY, areaWidth, areaHeight) => {
  const startTile = positionToTileIndex({ x: originX, y: originY });
  const bottomPaddingTileCount = 5;
  const rowTileCount = Math.ceil(areaWidth / tileWidth);
  const columnTileCount =
    Math.ceil(areaHeight / tileHalfHeight) + bottomPaddingTileCount;

  for (let i = -1; i < rowTileCount; i++) {
    for (let j = 0; j < columnTileCount; j++) {
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

export { rectangularTileSelection, horizontalTileSelection };

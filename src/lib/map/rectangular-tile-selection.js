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
  const startTileOrigin = tileIndexToPosition(startTile);
  const centerPointX = startTileOrigin.x + tileHalfWidth;
  const centerPointY = startTileOrigin.y + tileHalfHeight;

  const originDistanceX = originX - startTileOrigin.x;
  const originDistanceY = originY - startTileOrigin.y;

  const distanceFromCenterX = originX - centerPointX;
  const distanceFromCenterY = originY - centerPointY;

  const distanceToNextTileX =
    tileWidth -
    originDistanceX +
    Math.abs(distanceFromCenterY) / tileDimensionRatio;

  const distanceToNextTileY =
    tileHeight -
    originDistanceY +
    Math.abs(distanceFromCenterX) * tileDimensionRatio;

  const xTileCount = Math.ceil(
    (areaWidth - distanceToNextTileX) / tileWidth + 1
  );

  const yTileCount = Math.ceil(
    (areaHeight - distanceToNextTileY) / tileHeight + 1
  );

  for (let x = 0; x < xTileCount; x++) {
    for (let y = 0; y < yTileCount; y++) {
      const tile = {
        x: startTile.x + x - y,
        y: startTile.y + x + y,
      };
      highlightTile(tile, "yellow");
    }
  }

  // Offset tiles

  // Outlier rows
  const distanceToNextOffsetTileX =
    tileWidth -
    originDistanceX -
    Math.abs(distanceFromCenterY) / tileDimensionRatio;

  const distanceToNextOffsetTileY =
    tileHeight -
    originDistanceY -
    Math.abs(distanceFromCenterX) * tileDimensionRatio;

  const xOffsetTileCount = Math.ceil(
    (areaWidth - distanceToNextOffsetTileX) / tileWidth
  );

  const yOffsetTileCount = Math.ceil(
    (areaHeight - distanceToNextOffsetTileY) / tileHeight
  );

  // Top row tiles

  const aboveCenter = distanceFromCenterY < 0;

  if (aboveCenter) {
    const offsetsX = {
      x: 1,
      y: 0,
    };

    for (let x = 0; x < xOffsetTileCount; x++) {
      const tile = {
        x: startTile.x + x + offsetsX.x,
        y: startTile.y + x + offsetsX.y,
      };
      highlightTile(tile, "orange");
    }
  }

  // Left column tiles

  const leftOfCenter = distanceFromCenterX < 0;

  if (leftOfCenter) {
    const offsetsY = {
      x: -1,
      y: 0,
    };

    for (let y = 0; y < yOffsetTileCount; y++) {
      const tile = {
        x: startTile.x - y + offsetsY.x,
        y: startTile.y + y + offsetsY.y,
      };
      highlightTile(tile, "purple");
    }
  }
};

export { rectangularTileSelection };

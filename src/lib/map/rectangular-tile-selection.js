import { positionToTileIndex, tileIndexToPosition, highlightTile } from ".";
import {
  tileWidth,
  tileHeight,
  tileHalfWidth,
  tileHalfHeight,
  tileDimensionRatio,
} from "../constants";

const findTopRow = (originX, originY, areaWidth) => {
  const startTile = positionToTileIndex({ x: originX, y: originY });
  const startTileOrigin = tileIndexToPosition(startTile);
  const centerPointY = startTileOrigin.y + tileHalfHeight;
  const tileRelativeX = originX - startTileOrigin.x;
  const distanceFromCenterY = originY - centerPointY;
  const edgeToBoundingBoxX = Math.abs(distanceFromCenterY) / tileDimensionRatio;
  const aboveCenter = distanceFromCenterY < 0;

  let offsetsX;
  let xTileCount;
  let distanceToFirstTileX;

  if (aboveCenter) {
    distanceToFirstTileX = tileWidth - tileRelativeX - edgeToBoundingBoxX;
    xTileCount = Math.ceil((areaWidth - distanceToFirstTileX) / tileWidth);

    offsetsX = {
      x: 1,
      y: 0,
    };
  } else {
    distanceToFirstTileX = tileWidth - tileRelativeX + edgeToBoundingBoxX;
    xTileCount = Math.ceil((areaWidth - distanceToFirstTileX) / tileWidth + 1);

    offsetsX = {
      x: 0,
      y: 0,
    };
  }

  for (let x = 0; x < xTileCount; x++) {
    const tile = {
      x: startTile.x + x + offsetsX.x,
      y: startTile.y + x + offsetsX.y,
    };
    highlightTile(tile, "yellow");
  }
};

const rectangularTileSelection = (originX, originY, areaWidth, areaHeight) => {
  findTopRow(originX, originY, areaWidth);

  // Right column tiles
  const columnOriginX = originX + areaWidth;
  const startTile = positionToTileIndex({ x: originX + areaWidth, y: originY });

  const startTileOrigin = tileIndexToPosition(startTile);
  const centerPointX = startTileOrigin.x + tileHalfWidth;
  const centerPointY = startTileOrigin.y + tileHalfHeight;

  const tileRelativeX = columnOriginX - startTileOrigin.x;
  const tileRelativeY = originY - startTileOrigin.y;

  const distanceFromCenterX = columnOriginX - centerPointX;
  const distanceFromCenterY = originY - centerPointY;

  const edgeToBoundingBoxX = Math.abs(distanceFromCenterY) / tileDimensionRatio;
  const edgeToBoundingBoxY = Math.abs(distanceFromCenterX) * tileDimensionRatio;

  // Top row tiles

  const leftOfCenter = distanceFromCenterX < 0;

  let offsetsY;
  let yTileCount;
  let distanceToFirstTileY;

  if (leftOfCenter) {
    distanceToFirstTileY = tileHeight - tileRelativeY - edgeToBoundingBoxY;
    yTileCount =
      Math.ceil((areaHeight - distanceToFirstTileY) / tileHeight) + 1;

    offsetsY = {
      x: 0,
      y: 0,
    };
  } else {
    distanceToFirstTileY = tileHeight - tileRelativeY + edgeToBoundingBoxY;
    yTileCount = Math.ceil((areaHeight - distanceToFirstTileY) / tileHeight);

    offsetsY = {
      x: 0,
      y: 1,
    };
  }

  for (let y = 0; y < yTileCount; y++) {
    const tile = {
      x: startTile.x - y + offsetsY.x,
      y: startTile.y + y + offsetsY.y,
    };
    highlightTile(tile, "orange");
  }
};

export { rectangularTileSelection };

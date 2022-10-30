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

  const tileRelativeX = originX - startTileOrigin.x;
  const tileRelativeY = originY - startTileOrigin.y;

  const distanceFromCenterX = originX - centerPointX;
  const distanceFromCenterY = originY - centerPointY;

  const edgeToBoundingBoxX = Math.abs(distanceFromCenterY) / tileDimensionRatio;
  const edgeToBoundingBoxY = Math.abs(distanceFromCenterX) * tileDimensionRatio;

  const distanceToFirstTileX = tileWidth - tileRelativeX + edgeToBoundingBoxX;
  const distanceToFirstTileY = tileHeight - tileRelativeY + edgeToBoundingBoxY;

  const xTileCount = Math.ceil(
    (areaWidth - distanceToFirstTileX) / tileWidth + 1
  );

  const yTileCount = Math.ceil(
    (areaHeight - distanceToFirstTileY) / tileHeight + 1
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

  // Outlier rows
  const distanceToFirstOffsetTileX =
    tileWidth - tileRelativeX - edgeToBoundingBoxX;

  const distanceToFirstOffsetTileY =
    tileHeight - tileRelativeY - edgeToBoundingBoxY;

  const xOffsetTileCount = Math.ceil(
    (areaWidth - distanceToFirstOffsetTileX) / tileWidth
  );

  const yOffsetTileCount = Math.ceil(
    (areaHeight - distanceToFirstOffsetTileY) / tileHeight
  );

  //////////////////////////////////////////

  const distanceToFirstInnerTile =
    tileRelativeX * tileDimensionRatio +
    tileRelativeY +
    areaWidth * tileDimensionRatio +
    areaHeight -
    (tileWidth + tileHeight) * tileDimensionRatio;

  if (distanceToFirstInnerTile > 0) {
    // const xTileInnerCount = Math.ceil(
    //   (areaWidth - distanceToFirstOffsetTileX) / tileWidth + 1
    // );
    // const yTileInnerCount = Math.ceil(
    //   (areaHeight - distanceToFirstOffsetTileY) / tileHeight + 1
    // );
    // for (let x = 0; x < xTileInnerCount; x++) {
    //   for (let y = 0; y < yTileInnerCount; y++) {
    //     const tile = {
    //       x: startTile.x + x - 1 - y,
    //       y: startTile.y + x + y,
    //     };
    //     highlightTile(tile, "red");
    //   }
    // }
  }

  //////////////////////////////////////////

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

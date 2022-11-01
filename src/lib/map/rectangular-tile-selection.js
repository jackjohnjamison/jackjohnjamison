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
  const centerPointY = startTileOrigin.y + tileHalfHeight;
  const tileRelativeX = originX - startTileOrigin.x;
  const distanceFromCenterY = originY - centerPointY;
  const edgeToBoundingBoxX = Math.abs(distanceFromCenterY) / tileDimensionRatio;
  const aboveCenter = distanceFromCenterY < 0;

  const distanceToFirstTile = tileWidth - tileRelativeX + edgeToBoundingBoxX;
  const distanceToFirstOffsetTile =
    tileWidth - tileRelativeX - edgeToBoundingBoxX;

  let offsetsX;
  let xTileCount;
  let distanceToNextTile;

  const rowOffset = {
    x: 0,
    y: 0,
  };

  const offsetRow = () => {
    distanceToNextTile = distanceToFirstOffsetTile;
    xTileCount = Math.ceil((areaWidth - distanceToNextTile) / tileWidth);

    offsetsX = {
      x: 1,
      y: 0,
    };

    for (let i = 0; i < xTileCount; i++) {
      const tile = {
        x: startTile.x + i + offsetsX.x + rowOffset.x,
        y: startTile.y + i + offsetsX.y + rowOffset.y,
      };
      highlightTile(tile, "yellow");
    }
  };

  const inlineRow = () => {
    distanceToNextTile = distanceToFirstTile;
    xTileCount = Math.ceil((areaWidth - distanceToNextTile) / tileWidth + 1);

    offsetsX = {
      x: 0,
      y: 0,
    };

    for (let i = 0; i < xTileCount; i++) {
      const tile = {
        x: startTile.x + i + offsetsX.x + rowOffset.x,
        y: startTile.y + i + offsetsX.y + rowOffset.y,
      };
      highlightTile(tile, "orange");
    }

    rowOffset.y++;
    rowOffset.x--;
  };

  let offsetTurn = aboveCenter;

  const tileCountY = areaHeight / tileHalfHeight + 1;

  for (let i = 0; i < tileCountY; i++) {
    if (offsetTurn) {
      offsetRow();
    } else {
      inlineRow();
    }
    offsetTurn = !offsetTurn;
  }
};

export { rectangularTileSelection };

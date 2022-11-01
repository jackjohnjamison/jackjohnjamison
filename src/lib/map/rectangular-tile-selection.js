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

    for (let x = 0; x < xTileCount; x++) {
      const tile = {
        x: startTile.x + x + offsetsX.x + rowOffset.x,
        y: startTile.y + x + offsetsX.y + rowOffset.y,
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

    for (let x = 0; x < xTileCount; x++) {
      const tile = {
        x: startTile.x + x + offsetsX.x + rowOffset.x,
        y: startTile.y + x + offsetsX.y + rowOffset.y,
      };
      highlightTile(tile, "orange");
    }

    rowOffset.y++;
    rowOffset.x--;
  };

  let offsetTurn = aboveCenter;

  for (let i = 0; i < 10; i++) {
    if (offsetTurn) {
      offsetRow();
    } else {
      inlineRow();
    }
    offsetTurn = !offsetTurn;
  }

  // if (aboveCenter) {
  //   distanceToNextTile = distanceToFirstOffsetTile;
  //   xTileCount = Math.ceil((areaWidth - distanceToNextTile) / tileWidth);

  //   offsetsX = {
  //     x: 1,
  //     y: 0,
  //   };
  // } else {
  //   distanceToNextTile = distanceToFirstTile;
  //   xTileCount = Math.ceil((areaWidth - distanceToNextTile) / tileWidth + 1);

  //   offsetsX = {
  //     x: 0,
  //     y: 0,
  //   };
  // }

  // for (let x = 0; x < xTileCount; x++) {
  //   const tile = {
  //     x: startTile.x + x + offsetsX.x,
  //     y: startTile.y + x + offsetsX.y,
  //   };
  //   highlightTile(tile, "yellow");
  // }

  // ////////////////////////////////////////////////////////

  // const distanceToFirstTileBX = tileWidth - tileRelativeX + edgeToBoundingBoxX;

  // const xTileCountB = Math.ceil(
  //   (areaWidth - distanceToFirstTileBX) / tileWidth + 1
  // );

  // for (let x = 0; x < xTileCountB; x++) {
  //   const tile = {
  //     x: startTile.x + x,
  //     y: startTile.y + x,
  //   };
  //   highlightTile(tile, "orange");
  // }
};

const rectangularTileSelection = (originX, originY, areaWidth, areaHeight) => {
  findTopRow(originX, originY, areaWidth);
};

export { rectangularTileSelection };

import {
  positionToTileIndex,
  tileIndexToPosition,
  isWalkable,
  highlightTile,
} from "../../map";
import {
  tileWidth,
  tileHeight,
  tileDimensionRatio,
  collisionDistance,
} from "../../constants";

const tileOverlap = (tileIndex, entity) => {
  const { position } = entity;

  const tilePosition = tileIndexToPosition(tileIndex);

  const xOverlap = position.x - tilePosition.x;
  const yOverlap = position.y - tilePosition.y;

  const absoluteXOverlap = Math.abs(xOverlap);
  const absoluteYOverlap = Math.abs(yOverlap);

  // Finds isometric collisions
  const distance = absoluteXOverlap / tileDimensionRatio + absoluteYOverlap;

  const isOverlapping = distance < collisionDistance;

  if (isOverlapping) {
    const overlappingDistance = collisionDistance - distance;

    const angleRadians = Math.atan2(
      position.y - tilePosition.y,
      position.x - tilePosition.x
    );

    const xChange = Math.cos(angleRadians) * overlappingDistance;
    const yChange = Math.sin(angleRadians) * overlappingDistance;

    position.x += xChange;
    position.y += yChange;
  }

  return isOverlapping;
};

const detectCollision = (entity) => {
  const testTileIndex = positionToTileIndex({
    x: entity.position.x + tileWidth / 2,
    y: entity.position.y + tileHeight / 2,
  });

  const adjacentX = [testTileIndex.x, testTileIndex.x - 1, testTileIndex.x + 1];
  const adjacentY = [testTileIndex.y, testTileIndex.y - 1, testTileIndex.y + 1];

  // Tests all adjacent tiles
  adjacentX.forEach((x) => {
    adjacentY.forEach((y) => {
      if (!isWalkable({ x, y })) {
        if (import.meta.env.VITE_DEBUG_COLLISIONS) {
          highlightTile({ x, y }, "blue");
        }

        tileOverlap({ x, y }, entity);
      }
    });
  });
};

export { detectCollision };

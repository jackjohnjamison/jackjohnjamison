import { scene } from "../../scene";
import { findPath } from "../../find-path";
import {
  positionToTileIndex,
  tileIndexToPosition,
  isWalkable,
} from "../../map";
import { tileWidth, tileHeight } from "../../constants";

const pathfinding = (entity, speed) => {
  const { entityMap } = scene;
  let movementAngleRadians = null;
  let targetTile;
  let xDistancePosative;
  let yDistancePosative;
  let currentPath = [];
  let currentPathIndex = 1;

  const properties = {
    isMoving: false,
  };

  const move = (delta) => {
    if (properties.isMoving) {
      const movementSpeed = speed * delta;

      const xVelocity = movementSpeed * Math.cos(movementAngleRadians);
      const yVelocity = movementSpeed * Math.sin(movementAngleRadians);

      // Moves the entity
      entity.position.x += xVelocity;
      entity.position.y += yVelocity;

      const xPositionDifference = targetTile.x - entity.position.x;
      const yPositionDifference = targetTile.y - entity.position.y;

      const xOvershoot = xPositionDifference > 0 !== xDistancePosative;
      const yOvershoot = yPositionDifference > 0 !== yDistancePosative;

      // Sets position to destination once it overshoots
      if (xOvershoot || yOvershoot) {
        entity.position.x = targetTile.x;
        entity.position.y = targetTile.y;

        if (currentPathIndex < currentPath.length - 1) {
          currentPathIndex++;
          setMoveTarget();
        } else {
          properties.isMoving = false;
        }
      }

      entityMap.removeEntity({
        tileIndex: entity.tileIndex,
        id: entity.id,
      });

      entity.tileIndex = positionToTileIndex({
        x: entity.position.x + tileWidth / 2,
        y: entity.position.y + tileHeight / 2,
      });

      entityMap.addEntity({
        tileIndex: entity.tileIndex,
        id: entity.id,
        render: entity.render,
      });
    }
  };

  const unsetPath = () => {
    properties.isMoving = false;
    currentPath = [];
    currentPathIndex = 1;
  };

  const setMoveTarget = () => {
    const targetIndex = {
      x: currentPath[currentPathIndex][1],
      y: currentPath[currentPathIndex][0],
    };

    if (isWalkable(targetIndex)) {
      // If tile isn't blocked set it as the movement target
      targetTile = tileIndexToPosition(targetIndex);

      const xPositionDifference = targetTile.x - entity.position.x;
      const yPositionDifference = targetTile.y - entity.position.y;

      xDistancePosative = xPositionDifference > 0;
      yDistancePosative = yPositionDifference > 0;

      movementAngleRadians = Math.atan2(
        yPositionDifference,
        xPositionDifference
      );
    } else {
      unsetPath();
    }
  };

  const requestMove = (tileIndex) => {
    const path = findPath(entity.tileIndex, tileIndex);
    // Checks if the requested tile index is the same as the current one
    const tileIndexIsCurrent =
      tileIndex.x === entity.tileIndex.x && tileIndex.y === entity.tileIndex.y;

    if (!properties.isMoving && !tileIndexIsCurrent && path.length) {
      currentPath = path;
      currentPathIndex = 1;
      setMoveTarget();
      properties.isMoving = true;
    }
  };

  return {
    move,
    requestMove,
    unsetPath,
    properties,
  };
};

export { pathfinding };

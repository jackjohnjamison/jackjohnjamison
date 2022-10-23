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

  entity.isMoving = false;

  const move = (delta) => {
    if (entity.isMoving) {
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

        if (entity.path.length > 1) {
          entity.path.shift();

          setMoveTarget();
        } else {
          entity.isMoving = false;
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
    entity.isMoving = false;
    entity.path = [];
  };

  const setMoveTarget = () => {
    const [pathStep] = entity.path;
    const [y, x] = pathStep;
    const targetIndex = { x, y };

    if (isWalkable(targetIndex)) {
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

    if (!entity.isMoving && !tileIndexIsCurrent && path.length) {
      entity.path = path;
      entity.path.shift();
      setMoveTarget();
      entity.isMoving = true;
    }
  };

  return {
    move,
    requestMove,
    unsetPath,
  };
};

export { pathfinding };

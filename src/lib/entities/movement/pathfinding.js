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

  const tileIndexPrevious = {};

  let movementAngleRadians = null;
  let targetTile;
  let xDistancePosative;
  let yDistancePosative;

  entity.isMoving = false;

  const move = (delta) => {
    if (entity.isMoving) {
      const { position, tileIndex, path } = entity;
      const movementSpeed = speed * delta;

      const xVelocity = movementSpeed * Math.cos(movementAngleRadians);
      const yVelocity = movementSpeed * Math.sin(movementAngleRadians);

      // Moves the entity
      position.x += xVelocity;
      position.y += yVelocity;

      const xPositionDifference = targetTile.x - position.x;
      const yPositionDifference = targetTile.y - position.y;

      const xOvershoot = xPositionDifference > 0 !== xDistancePosative;
      const yOvershoot = yPositionDifference > 0 !== yDistancePosative;

      // Sets position to destination once it overshoots
      if (xOvershoot || yOvershoot) {
        position.x = targetTile.x;
        position.y = targetTile.y;

        if (path.length > 1) {
          path.shift();
          setMoveTarget();
          scene.redrawEffects = true;
        } else {
          entity.isMoving = false;
          scene.redrawEffects = true;
        }
      }

      entity.tileIndex = positionToTileIndex({
        x: position.x + tileWidth / 2,
        y: position.y + tileHeight / 2,
      });

      if (
        tileIndex.x !== tileIndexPrevious.x ||
        tileIndex.y !== tileIndexPrevious.y
      ) {
        entityMap.removeEntity({
          tileIndex: tileIndexPrevious,
          id: entity.id,
        });

        entityMap.addEntity({
          tileIndex: tileIndex,
          id: entity.id,
          render: entity.render,
        });

        tileIndexPrevious.x = tileIndex.x;
        tileIndexPrevious.y = tileIndex.y;
      }
    }
  };

  const unsetPath = () => {
    entity.isMoving = false;
    entity.path.length = 0;
  };

  const setMoveTarget = () => {
    const [pathStep] = entity.path;
    const [x, y] = pathStep;
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
      scene.redrawEffects = true;
    }
  };

  const requestMove = (tileIndex) => {
    const path = findPath(entity.tileIndex, tileIndex);
    // Checks if the requested tile index is the same as the current one
    const tileIndexIsCurrent =
      tileIndex.x === entity.tileIndex.x && tileIndex.y === entity.tileIndex.y;

    if (!entity.isMoving && !tileIndexIsCurrent && path.length) {
      tileIndexPrevious.x = entity.tileIndex.x;
      tileIndexPrevious.y = entity.tileIndex.y;
      entity.path = path;
      entity.path.shift();
      setMoveTarget();
      entity.isMoving = true;
      scene.redrawEffects = true;
    }
  };

  return {
    move,
    requestMove,
    unsetPath,
  };
};

export { pathfinding };

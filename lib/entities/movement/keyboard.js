import { scene } from "../../scene";
import { keyCheck } from "../../controls";
import {
  isWalkable,
  positionToTileIndex,
  tileIndexToPosition,
} from "../../map";
import { tileWidth, tileHeight } from "../../constants";

let isMoving = false;
let targetTile;
let xDistancePosative;
let yDistancePosative;
let movementAngleRadians;

const degreesToRadians = (degrees) => {
  return degrees * (Math.PI / 180);
};

const degrees45rad = degreesToRadians(45);

const getTileByAngle = (position, angle) => {
  const targetX = position.x + Math.cos(angle) * tileWidth + tileWidth / 2;
  const targetY = position.y + Math.sin(angle) * tileHeight + tileHeight / 2;

  return positionToTileIndex({ x: targetX, y: targetY });
};

const keyboardMovement = (entity, speed) => {
  const requestMove = () => {
    const { tileIndex } = entity;

    const position = tileIndexToPosition(tileIndex);

    const xAxis = (keyCheck("KeyD") - keyCheck("KeyA")) * tileWidth;
    const yAxis = (keyCheck("KeyS") - keyCheck("KeyW")) * tileHeight;
    const angleRadians = Math.atan2(yAxis, xAxis);

    // Diagonal movement
    if (xAxis && yAxis) {
      const requestTile = getTileByAngle(position, angleRadians);

      const tileIndexIsCurrent =
        requestTile.x === tileIndex.x && requestTile.y === tileIndex.y;

      if (isWalkable(requestTile) && !tileIndexIsCurrent) {
        setMoveTarget(requestTile, angleRadians, xAxis, yAxis);
      }

      // Single axis movement
    } else if (xAxis || yAxis) {
      const leftCornerTile = getTileByAngle(
        position,
        angleRadians - degrees45rad
      );
      const rightCornerTile = getTileByAngle(
        position,
        angleRadians + degrees45rad
      );
      const requestTile = getTileByAngle(position, angleRadians);

      if (
        isWalkable(leftCornerTile) &&
        isWalkable(requestTile) &&
        isWalkable(rightCornerTile)
      ) {
        setMoveTarget(requestTile);
      } else if (isWalkable(leftCornerTile) && !isWalkable(rightCornerTile)) {
        setMoveTarget(leftCornerTile);
      } else if (!isWalkable(leftCornerTile) && isWalkable(rightCornerTile)) {
        setMoveTarget(rightCornerTile);
      }
    }
  };

  const setMoveTarget = (requestTile) => {
    const { position } = entity;

    targetTile = tileIndexToPosition(requestTile);

    const xPositionDifference = targetTile.x - position.x;
    const yPositionDifference = targetTile.y - position.y;

    xDistancePosative = xPositionDifference > 0;
    yDistancePosative = yPositionDifference > 0;

    movementAngleRadians = Math.atan2(yPositionDifference, xPositionDifference);

    isMoving = true;
  };

  const move = (delta) => {
    const { entityMap } = scene;
    const { position } = entity;

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

      isMoving = false;
      requestMove();
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
  };

  return (delta) => {
    if (isMoving) {
      move(delta);
    }

    requestMove();
    sa;
  };
};

export { keyboardMovement };

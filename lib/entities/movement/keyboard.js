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

const keyboardMovement = (entity, speed) => {
  const requestMove = () => {
    const { position, tileIndex } = entity;

    let requestX = position.x + tileWidth / 2;
    let requestY = position.y + tileHeight / 2;

    requestY -= keyCheck("KeyW") ? tileHeight : 0;
    requestY += keyCheck("KeyS") ? tileHeight : 0;
    requestX -= keyCheck("KeyA") ? tileWidth : 0;
    requestX += keyCheck("KeyD") ? tileWidth : 0;

    const requestTile = positionToTileIndex({ x: requestX, y: requestY });
    const tileIndexIsCurrent =
      requestTile.x === tileIndex.x && requestTile.y === tileIndex.y;

    // sconsole.log("requestTile ", requestTile, tileIndex, tileIndexIsCurrent);

    if (isWalkable(requestTile) && !tileIndexIsCurrent) {
      console.log("requestTile ", requestTile);

      targetTile = tileIndexToPosition(requestTile);

      const xPositionDifference = targetTile.x - position.x;
      const yPositionDifference = targetTile.y - position.y;

      xDistancePosative = xPositionDifference > 0;
      yDistancePosative = yPositionDifference > 0;

      movementAngleRadians = Math.atan2(
        yPositionDifference,
        xPositionDifference
      );

      isMoving = true;
    }
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
    } else {
      requestMove();
    }
  };
};

export { keyboardMovement };

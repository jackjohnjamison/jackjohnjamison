import { scene } from "../../scene";
import { keyCheck } from "../../controls";
import { detectCollision } from "./detect-collision";
import { positionToTileIndex } from "../../map";
import {
  tileWidth,
  tileHeight,
  friction,
  unitAcceleration,
} from "../../constants";

const velocity = { x: 0, y: 0 };

const keyboardMovement = (entity) => {
  const { entityMap } = scene;

  return (delta) => {
    const up = keyCheck("KeyW");
    const down = keyCheck("KeyS");
    const right = keyCheck("KeyD");
    const left = keyCheck("KeyA");

    const xAxis = (right - left) * tileWidth;
    const yAxis = (down - up) * tileHeight;
    const angleRadians = Math.atan2(yAxis, xAxis);

    if (xAxis) {
      velocity.x += Math.cos(angleRadians) * unitAcceleration * delta;
    }

    if (yAxis) {
      velocity.y += Math.sin(angleRadians) * unitAcceleration * delta;
    }

    velocity.angleRadians = angleRadians;

    entity.position.x += velocity.x;
    entity.position.y += velocity.y;

    entityMap.removeEntity({
      tileIndex: entity.tileIndex,
      id: entity.id,
    });

    detectCollision(entity);

    velocity.x *= friction;
    velocity.y *= friction;

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
};

export { keyboardMovement };

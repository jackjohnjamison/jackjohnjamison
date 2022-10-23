import { scene } from "../scene";
import { getId } from "../utilities";
import { tileIndexToPosition } from "../map";
import { redrawEntities } from "../scene";
import { tileHeight, tileWidth } from "../constants";

const centerOffsetX = tileWidth / 2;
const centerOffsetY = tileHeight / 2;

const baseMarkerWidth = 20;
const baseMarkerHeight = 10;

class entity {
  constructor(sprite) {
    this.sprite = sprite;
    this.id = getId();
    this.position = {
      x: 0,
      y: 0,
    };
  }

  addToScene = (tileIndex) => {
    const { entityMap } = scene;
    const { id, render, redraw } = this;

    this.tileIndex = tileIndex;
    this.position = tileIndexToPosition(tileIndex);
    this.positionPrevious = this.position;
    this.redrawEntities = redrawEntities;

    entityMap.addEntity({
      tileIndex,
      id,
      render,
    });

    scene.entities.push(this);

    redraw();
  };

  render = () => {
    const { entityCtx } = scene;
    const { sprite, position } = this;

    const centerX = position.x + centerOffsetX;
    const centerY = position.y + centerOffsetY;

    entityCtx.strokeStyle = "lime";

    entityCtx.beginPath();
    entityCtx.ellipse(
      centerX,
      centerY,
      baseMarkerWidth,
      baseMarkerHeight,
      0,
      0,
      6.28319
    );

    entityCtx.stroke();

    entityCtx.drawImage(
      sprite.data,
      Math.round(position.x),
      Math.round(position.y - sprite.yOffset)
    );
  };

  redraw = () => {
    const { tileIndex, position, positionPrevious } = this;

    this.redrawEntities(tileIndex, position, positionPrevious);

    this.positionPrevious = {
      x: position.x,
      y: position.y,
    };
  };

  update() {}
}

export { entity };

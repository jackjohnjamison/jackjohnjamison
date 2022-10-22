import { scene } from ".";

// HighlightTile used for debug
import { tileIndexToPosition, drawImageTile, highlightTile } from "../map";
import { getSpriteImage } from "../sprites";
import { renderEntities } from "../entities";
import { tileWidth, tileHeight } from "../constants";

const redrawWidth = tileWidth;
const redrawHeight = tileHeight * 3;
const redrawWindowYoffset = tileHeight * 1.5;

const createRedrawWindow = (ctx, redrawWindowOrigin) => {
  const { x, y } = redrawWindowOrigin;
  ctx.save();
  ctx.beginPath();
  ctx.rect(x, y, redrawWidth, redrawHeight);
  ctx.clip();
  ctx.clearRect(x, y, redrawWidth, redrawHeight);
};

const redrawTile = (tileIndex) => {
  const { floorCtx, entityCtx, tileMap } = scene;
  const redrawWindowOrigin = tileIndexToPosition({
    x: tileIndex.x,
    y: tileIndex.y,
  });

  redrawWindowOrigin.y -= redrawWindowYoffset;

  createRedrawWindow(floorCtx, redrawWindowOrigin);
  createRedrawWindow(entityCtx, redrawWindowOrigin);

  redrawTileIndicesFloor.forEach((index) => {
    const x = index.x + tileIndex.x;
    const y = index.y + tileIndex.y;

    if (tileMap.tiles[x]?.[y]) {
      const tile = tileMap.tiles[x][y];

      if (tile.floor) {
        const { set, color, variant } = tile.floor;

        drawImageTile({
          x,
          y,
          image: getSpriteImage(set, color, variant),
        });
      }

      renderEntities(x, y);
    }
  });

  entityCtx.restore();
  floorCtx.restore();
};

const redrawEntities = (tileIndex, position, positionPrevious) => {
  const { entityCtx } = scene;

  const redrawWindowOrigin = {
    x: Math.floor(Math.min(position.x, positionPrevious.x)),
    y: Math.floor(Math.min(position.y, positionPrevious.y) - tileHeight * 2),
  };

  const width = Math.ceil(
    Math.abs(position.x - positionPrevious.x) + redrawWidth
  );
  const height = Math.ceil(
    Math.abs(position.y - positionPrevious.y) + redrawHeight
  );

  redrawWindowOrigin.y;

  const { x, y } = redrawWindowOrigin;
  entityCtx.save();
  entityCtx.beginPath();
  entityCtx.rect(x, y, width, height);
  entityCtx.clip();
  entityCtx.clearRect(x, y, width, height);

  redrawTileIndicesEntity.forEach((index) => {
    const x = index.x + tileIndex.x;
    const y = index.y + tileIndex.y;
    renderEntities(x, y);
  });

  entityCtx.restore();
};

export { redrawTile, redrawEntities };

const redrawTileIndicesEntity = [
  {
    x: 3,
    y: -3,
  },
  {
    x: 3,
    y: -2,
  },
  {
    x: 3,
    y: -1,
  },
  {
    x: 2,
    y: -3,
  },
  {
    x: 2,
    y: -2,
  },
  {
    x: 2,
    y: -1,
  },
  {
    x: 2,
    y: 0,
  },
  {
    x: 1,
    y: -3,
  },
  {
    x: 1,
    y: -2,
  },
  {
    x: 1,
    y: -1,
  },
  {
    x: 1,
    y: 0,
  },
  {
    x: 1,
    y: 1,
  },
  {
    x: 0,
    y: -2,
  },
  {
    x: 0,
    y: -1,
  },
  {
    x: 0,
    y: 0,
  },
  {
    x: 0,
    y: 1,
  },
  {
    x: 0,
    y: 2,
  },
  {
    x: -1,
    y: -1,
  },
  {
    x: -1,
    y: 0,
  },
  {
    x: -1,
    y: 1,
  },
  {
    x: -1,
    y: 2,
  },
  {
    x: -2,
    y: 0,
  },
  {
    x: -2,
    y: 1,
  },
  {
    x: -3,
    y: 1,
  },
  {
    x: -2,
    y: 2,
  },
  {
    x: -1,
    y: 3,
  },
  {
    x: -3,
    y: 2,
  },
  {
    x: -2,
    y: 3,
  },
  {
    x: -3,
    y: 3,
  },
];

const redrawTileIndicesFloor = [
  {
    x: 3,
    y: -3,
  },
  {
    x: 3,
    y: -2,
  },
  {
    x: 2,
    y: -3,
  },
  {
    x: 2,
    y: -2,
  },
  {
    x: 2,
    y: -1,
  },
  {
    x: 1,
    y: -2,
  },
  {
    x: 1,
    y: -1,
  },
  {
    x: 1,
    y: 0,
  },
  {
    x: 0,
    y: -1,
  },
  {
    x: 0,
    y: 0,
  },
  {
    x: 0,
    y: 1,
  },
  {
    x: -1,
    y: 0,
  },
  {
    x: -1,
    y: 1,
  },
  {
    x: -1,
    y: 2,
  },
  {
    x: -2,
    y: 1,
  },
  {
    x: -2,
    y: 2,
  },
  {
    x: -3,
    y: 2,
  },
  {
    x: -2,
    y: 3,
  },
  {
    x: -3,
    y: 3,
  },
];

import { scene } from "../scene";
import { drawImageTile } from ".";
import { positionToTileIndex, highlightTile } from ".";
import { getSpriteImage } from "../sprites";
import { tileWidth, tileHalfWidth, tileHalfHeight } from "../constants";

const tileOverCount = 5;

const loopTiles = (startTile, columns, rows) => {
  const { xTiles, yTiles, tiles } = scene.tileMap;

  for (let j = 0; j < rows; j++) {
    const xOffset = -Math.floor(j / 2) + 1;
    const yOffset = Math.ceil(j / 2);

    const columnStart = Math.max(
      -1,
      -startTile.x - xOffset,
      -startTile.y - yOffset
    );

    const columnEnd = Math.min(
      columns,
      xTiles - startTile.x - xOffset,
      yTiles - startTile.y - yOffset
    );

    for (let i = columnStart; i < columnEnd; i++) {
      // const tile = {
      //   x: startTile.x + i + xOffset,
      //   y: startTile.y + i + yOffset,
      // };
      // console.log("IRAN");
      // highlightTile(tile, "orange");

      const tile = tiles[startTile.x + i + xOffset][startTile.y + i + yOffset];

      if (tile.floor) {
        const { set, color, variant } = tile.floor;

        drawImageTile({
          x: startTile.x + i + xOffset,
          y: startTile.y + i + yOffset,
          image: getSpriteImage(set, color, variant),
        });
      }

      // renderEntities(x, y);
    }
  }
};

const rectangularTileSelection = (originX, originY, areaWidth, areaHeight) => {
  const startTile = positionToTileIndex({ x: originX, y: originY });
  const columns = Math.ceil((areaWidth + tileHalfWidth) / tileWidth);
  const rows =
    Math.ceil((areaHeight + tileHalfHeight) / tileHalfHeight) + tileOverCount;

  loopTiles(startTile, columns, rows);
};

const horizontalTileSelection = (originX, originY, areaWidth) => {
  const startTile = positionToTileIndex({ x: originX, y: originY });
  const columns = Math.ceil((areaWidth + tileHalfWidth) / tileWidth);

  loopTiles(startTile, columns, tileOverCount);
};

const verticalTileSelection = (originX, originY, areaHeight) => {
  const startTile = positionToTileIndex({
    x: originX - tileHalfWidth,
    y: originY,
  });
  const rows = Math.ceil((areaHeight + tileHalfHeight) / tileHalfHeight) + 1;
  const columns = 1;

  loopTiles(startTile, columns, rows);
};

export {
  rectangularTileSelection,
  horizontalTileSelection,
  verticalTileSelection,
};

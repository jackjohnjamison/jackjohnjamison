import { scene } from "../scene";
import { tileIndexToPosition } from "../map";
import { getSpriteImage } from "../sprites";

const renderEntities = (x, y) => {
  const { tileMap, entityMap } = scene;

  const tile = tileMap.tiles[x]?.[y];
  if (tile) {
    const { feature } = tile;

    const position = tileIndexToPosition({ x, y });

    const entityMapLocation = entityMap.entities[x][y];

    if (entityMapLocation) {
      entityMapLocation();
    }

    if (feature) {
      const { set, color, variant } = feature;
      const image = getSpriteImage(set, color, variant);
      scene.entityCtx.drawImage(
        image.data,
        position.x,
        position.y - image.yOffset
      );

      if (entityMapLocation) {
        scene.entityCtx.globalAlpha = 0.5;
        entityMapLocation();
        scene.entityCtx.globalAlpha = 1;
      }
    }
  }
};

export { renderEntities };

import { setWalkable } from "../map";
import { entity } from "./entity";

const createEntityMap = (tileMap) => {
  const entityMap = {};
  entityMap.entities = [];

  const { xTiles, yTiles } = tileMap;

  for (let x = 0; x < xTiles; x++) {
    entityMap.entities[x] = [];

    for (let y = 0; y < yTiles; y++) {
      entityMap.entities[x][y] = [];
    }
  }

  entityMap.addEntity = ({ tileIndex, id, render }) => {
    entityMap.entities[tileIndex.x][tileIndex.y].push({ id, render });

    setWalkable(tileIndex, false);
  };

  entityMap.entityCheck = ({ x, y }) => {
    return entityMap.entities[x][y].length === 0;
  };

  entityMap.removeEntity = ({ tileIndex, id }) => {
    const { x, y } = tileIndex;
    const entityAddress = entityMap.entities[x][y];
    entityAddress.forEach((entry, i) => {
      if (entry.id === id) {
        entityAddress.splice(i, 1);
      }
    });
    const noEntities = entityAddress.length === 0;

    if (noEntities) {
      const walkable = tileMap.tiles[x][y].walkable;
      setWalkable(tileIndex, walkable);
    }
  };

  return entityMap;
};

export { createEntityMap };

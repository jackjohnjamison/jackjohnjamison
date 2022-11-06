import { setWalkable } from "../map";

const createEntityMap = (tileMap) => {
  const entityMap = {};
  entityMap.entities = [];

  const { xTiles, yTiles } = tileMap;

  for (let x = 0; x < xTiles; x++) {
    entityMap.entities[x] = [];

    for (let y = 0; y < yTiles; y++) {
      entityMap.entities[x][y] = {};
    }
  }

  entityMap.addEntity = ({ tileIndex, id, render }) => {
    entityMap.entities[tileIndex.x][tileIndex.y][id] = render;

    setWalkable(tileIndex, false);
  };

  entityMap.entityCheck = ({ x, y }) => {
    const entityAddress = entityMap.entities[x][y];
    return Object.keys(entityAddress).length === 0;
  };

  entityMap.removeEntity = ({ tileIndex, id }) => {
    const { x, y } = tileIndex;
    const entityAddress = entityMap.entities[x][y];
    delete entityAddress[id];

    const noEntities = Object.keys(entityAddress).length === 0;

    if (noEntities) {
      const walkable = tileMap.tiles[x][y].walkable;
      console.log(walkable);
      setWalkable(tileIndex, walkable);
    }
  };

  return entityMap;
};

export { createEntityMap };

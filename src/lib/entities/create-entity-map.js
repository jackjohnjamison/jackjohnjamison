const createEntityMap = (tileMap) => {
  const entityMap = {};
  entityMap.entities = [];

  const { xTiles, yTiles } = tileMap;

  for (let x = 0; x < xTiles; x++) {
    entityMap.entities[x] = [];

    for (let y = 0; y < yTiles; y++) {
      entityMap.entities[x][y] = null;
    }
  }

  entityMap.addEntity = ({ tileIndex, render }) => {
    entityMap.entities[tileIndex.x][tileIndex.y] = render;
  };

  entityMap.removeEntity = ({ tileIndex }) => {
    const { x, y } = tileIndex;
    entityMap.entities[x][y] = null;
  };

  return entityMap;
};

export { createEntityMap };

import { scene } from "../scene";

const isWalkable = ({ x, y }) => {
  const { tileMap } = scene;

  return tileMap.walkableTileMatrix?.[x]?.[y] === 0;
};

const setWalkable = ({ x, y }, walkable) => {
  const { tileMap } = scene;

  tileMap.walkableTileMatrix[x][y] = walkable;
};

export { isWalkable, setWalkable };

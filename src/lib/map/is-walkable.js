import { scene } from "../scene";

const isWalkable = ({ x, y }) => {
  const { pathGrid } = scene.tileMap;

  // Yes x and y are backwards. That is just how path grid works ¯\_(ツ)_/¯
  return pathGrid.nodes[y][x].walkable;
};

const setWalkable = ({ x, y }, walkable) => {
  const { pathGrid } = scene.tileMap;

  pathGrid.setWalkableAt(x, y, walkable);
};

export { isWalkable, setWalkable };

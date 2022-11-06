import { scene } from "./scene";
import pathfinding from "pathfinding";

const finder = new pathfinding.AStarFinder({
  allowDiagonal: true,
  dontCrossCorners: true,
});

const findPath = (start, end) => {
  const { walkableTileMatrix } = scene.tileMap;
  const pathGrid = new pathfinding.Grid(walkableTileMatrix);

  console.log(pathGrid);
  console.log(walkableTileMatrix);

  return finder.findPath(start.y, start.x, end.y, end.x, pathGrid);
};

export { findPath };

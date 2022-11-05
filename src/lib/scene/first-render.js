import { scene } from ".";
import { renderEntities } from "../entities";
import { renderGrid } from "../map";

const firstRender = () => {
  const { view, floorCanvas, entityCanvas } = scene;
  const { xTiles, yTiles } = view;

  for (let x = xTiles - 1; x > -1; x--) {
    for (let y = 0; y < yTiles; y++) {
      renderGrid(x, y);
      renderEntities(x, y);
    }
  }

  floorCanvas.addEventListener("contextrestored", () => {
    for (let x = xTiles - 1; x > -1; x--) {
      for (let y = 0; y < yTiles; y++) {
        renderGrid(x, y);
      }
    }
  });

  entityCanvas.addEventListener("contextrestored", () => {
    for (let x = xTiles - 1; x > -1; x--) {
      for (let y = 0; y < yTiles; y++) {
        renderEntities(x, y);
      }
    }
  });
};

export { firstRender };

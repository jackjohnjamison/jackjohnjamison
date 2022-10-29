import { scene } from ".";
import { onFrameFunctions } from "./on-frame-functions";
import { renderLoop } from "./render-loop";

const reloadScene = (tileMap) => {
  renderLoop.stop();

  delete scene.entites;
  delete scene.tileMap;
  delete scene.entityMap;

  const { xTiles, yTiles } = tileMap;

  scene.view = scene.setView({
    xTiles,
    yTiles,
  });

  scene.loadMap(tileMap);

  renderLoop.start(onFrameFunctions);
};

export { reloadScene };

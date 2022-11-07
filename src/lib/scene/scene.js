import { Root } from "../../jsx/root";
import { createTileMapFromParams, loadMapFromImport } from "../map";
import { setView } from "./set-view";
import { initSaveLoad } from "./save-load";
import { createEntityMap, entity, unit, npc } from "../entities";
import { onFrameFunctions } from "./on-frame-functions";
import { panCameraTo } from "./camera";
import { renderLoop } from "./render-loop";
import { setMode, mouseTracker } from "../controls";
import { mapSize } from "../constants";
import { sprites } from "../sprites";
import { firstRender } from "./first-render";
import { frameRateMonitor } from "../frame-rate-monitor";

const scene = {};

// Sets parts of the scene that don't change between map loads
scene.start = async (map) => {
  const root = document.getElementById("root");
  scene.canvasRoot = Root();
  root.replaceWith(scene.canvasRoot);

  scene.floorCanvas = document.getElementById("floorCanvas");
  scene.floorCtx = scene.floorCanvas.getContext("2d", { alpha: false });

  // Canvas 2 for ui effects
  scene.canvasMid = document.getElementById("canvasMid");
  scene.ctxMid = scene.canvasMid.getContext("2d");

  scene.entityCanvas = document.getElementById("entityCanvas");
  scene.entityCtx = scene.entityCanvas.getContext("2d");

  // Canvas 4 for ui effects and mouse interactions
  scene.canvasTop = document.getElementById("canvasTop");
  scene.ctxTop = scene.canvasTop.getContext("2d");

  scene.monitor = frameRateMonitor();
  scene.mouse = mouseTracker(scene.canvasTop);

  scene.redrawEffects = true;

  scene.view = setView({
    xTiles: mapSize,
    yTiles: mapSize,
  });

  scene.hoveredTile = {
    path: null,
    tileIndex: null,
    tileIndexPrevious: null,
  };

  scene.mode = "playMode";

  mode.onchange = () => {
    // Gets the value of the radio buttons on the control type form
    const type = mode.elements.mode.value;
    setMode(type);
  };

  initSaveLoad();

  try {
    const mapData = await loadMapFromImport(map);

    scene.loadMap(mapData);
  } catch {
    const startingMap = createTileMapFromParams({
      xTiles: mapSize,
      yTiles: mapSize,
    });

    scene.loadMap(startingMap);
  }

  renderLoop.start(onFrameFunctions);
};

scene.loadMap = (tileMap) => {
  const { entityList, unitStart = { x: 1, y: 1 } } = tileMap;

  scene.tileMap = tileMap;
  scene.entityMap = createEntityMap(tileMap);

  scene.entities = [];
  scene.player = new unit();

  scene.player.addToScene(unitStart);

  if (entityList) {
    entityList.forEach((item) => {
      const { name, tileIndex } = item;

      switch (name) {
        case "entity":
          const _entity = new entity({});
          _entity.addToScene(tileIndex);
          break;

        case "npc":
          const _npc = new npc({
            sprite: sprites.playerTokens.despoiler,
            haloColor: "red",
          });

          _npc.addToScene(tileIndex);
          break;

        default:
      }
    });
  }

  setMode(scene.mode);
  scene.view.setApertureSize();
  firstRender();

  // Centre camera on player
  const camerCentreX = Math.round(
    scene.canvasTop.width / 2 - scene.player.position.x
  );
  const camerCentreY = Math.round(
    scene.canvasTop.height / 2 - scene.player.position.y
  );
  panCameraTo(camerCentreX, camerCentreY);
};

scene.setView = setView;

export { scene };

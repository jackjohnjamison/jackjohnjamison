import { createTileMapFromParams, loadMapFromImport } from "../map";
import { setView } from "./set-view";
import { initSaveLoad } from "./save-load";
import { createEntityMap, entity, unit, npc } from "../entities";
import { onFrameFunctions } from "./on-frame-functions";
import { renderLoop } from "./render-loop";
import { setMode, mouseTracker } from "../controls";
import { mapSize } from "../constants";
import { sprites } from "../sprites";
import { firstRender } from "./first-render";
import { frameRateMonitor } from "../frame-rate-monitor";

const scene = {};

// Sets parts of the scene that don't change between map loads
scene.start = async (map) => {
  // Set canvas and context
  scene.canvas = document.createElement("canvas");
  scene.ctx = scene.canvas.getContext("2d");
  canvasRoot.appendChild(scene.canvas);

  scene.monitor = frameRateMonitor();

  // Used for drawing the floor tiles in one piece
  scene.floorCanvas = new OffscreenCanvas(0, 0);
  scene.floorCtx = scene.floorCanvas.getContext("2d");

  scene.entityCanvas = new OffscreenCanvas(0, 0);
  scene.entityCtx = scene.entityCanvas.getContext("2d");

  scene.effectsMiddle = () => {};
  scene.effectsTop = () => {};

  scene.mouse = mouseTracker(scene.canvas);

  scene.view = setView({
    xTiles: mapSize,
    yTiles: mapSize,
  });

  scene.hoveredTile = {
    path: null,
    tileIndex: null,
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
};

scene.setView = setView;

export { scene };

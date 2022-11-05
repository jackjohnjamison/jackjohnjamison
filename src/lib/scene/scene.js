import { Root } from "../../jsx/root";
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
  const root = document.getElementById("root");
  scene.canvasRoot = Root();
  root.replaceWith(scene.canvasRoot);

  // Canvas 1 for floor tiles
  scene.canvas1 = document.getElementById("canvas1");
  scene.ctx1 = scene.canvas1.getContext("2d");

  // Canvas 2 for ui effects
  scene.canvas2 = document.getElementById("canvas2");
  scene.ctx2 = scene.canvas2.getContext("2d");

  // Canvas 3 for entites
  scene.canvas3 = document.getElementById("canvas3");
  scene.ctx3 = scene.canvas3.getContext("2d");

  // Canvas 4 for ui effects and mouse interactions
  scene.canvas4 = document.getElementById("canvas4");
  scene.ctx4 = scene.canvas4.getContext("2d");

  scene.monitor = frameRateMonitor();

  // Used for drawing the floor tiles in one piece
  scene.floorCanvas = new OffscreenCanvas(0, 0);
  scene.floorCtx = scene.floorCanvas.getContext("2d");

  scene.entityCanvas = new OffscreenCanvas(0, 0);
  scene.entityCtx = scene.entityCanvas.getContext("2d");

  scene.effectsMiddle = () => {};
  scene.effectsTop = () => {};

  scene.mouse = mouseTracker(scene.canvas4);

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

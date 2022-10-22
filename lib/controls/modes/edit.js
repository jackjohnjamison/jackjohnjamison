import { scene, panCameraKeys, panCameraTo } from "../../scene";
import { findPath } from "../../find-path";
import { findHoveredTile, paintTile, unsetTileLock } from "../../map";
import { resetBrushes } from "../../../jsx/tile-painter";

const editMode = {};
const noop = () => {};

editMode.set = () => {
  const { hoveredTile, mouse, player } = scene;

  // Sets initial state of the tile painter UI
  resetBrushes();

  mouse.onMouseMove = () => {
    if (mouse.buttonCode === 1) {
      panCameraTo(-mouse.drag.x, -mouse.drag.y);
    }
  };

  mouse.onMouseUp = () => {
    if (mouse.buttonCode === 1 && hoveredTile.tileIndex && !mouse.isDragged) {
      player.requestMove(hoveredTile.tileIndex);
    }
    unsetTileLock();
  };

  scene.onFrameControls = (delta) => {
    panCameraKeys(delta);

    hoveredTile.tileIndex = findHoveredTile({ x: mouse.x, y: mouse.y });

    if (hoveredTile.tileIndex) {
      if (mouse.isDragged) {
        scene.canvas.style.cursor = "grabbing";
      } else {
        scene.canvas.style.cursor = "pointer";
      }

      hoveredTile.path = findPath(player.tileIndex, hoveredTile.tileIndex);

      if (mouse.buttonCode === 3) paintTile(hoveredTile.tileIndex);
    } else {
      scene.canvas.style.cursor = "default";
    }
  };
};

editMode.unset = () => {
  const { mouse, player } = scene;
  player.unsetPath();
  mouse.onMouseMove = noop;
  mouse.onMouseUp = noop;
};

export { editMode };

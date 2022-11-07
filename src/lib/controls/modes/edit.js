import { scene, panCameraKeys, panCameraTo } from "../../scene";
import { movementMarkers } from "../movment-markers";
import { resetBrushes } from "../../../jsx/tile-painter";
import { findHoveredTile, paintTile, unsetTileLock } from "../../map";
import { noop } from "../../constants";

const editMode = {};

editMode.set = () => {
  const { hoveredTile, mouse, player, canvasTop } = scene;

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
      // Cursor state
      if (mouse.isDragged) {
        canvasTop.style.cursor = "grabbing";
      } else {
        canvasTop.style.cursor = "pointer";
      }
    } else {
      canvasTop.style.cursor = "default";
    }

    movementMarkers(hoveredTile.tileIndex);

    if (hoveredTile.tileIndex) {
      if (mouse.buttonCode === 3) paintTile(hoveredTile.tileIndex);
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

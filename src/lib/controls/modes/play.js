import { scene, panCameraKeys, panCameraTo } from "../../scene";
import { movementMarkers } from "../movment-markers";
import { findHoveredTile } from "../../map";
import { noop } from "../../constants";

const playMode = {};

playMode.set = () => {
  const { hoveredTile, mouse, player, canvasTop } = scene;

  mouse.onMouseMove = () => {
    if (mouse.buttonCode === 1) {
      panCameraTo(-mouse.drag.x, -mouse.drag.y);
    }
  };

  mouse.onMouseUp = () => {
    if (mouse.buttonCode === 1 && hoveredTile.tileIndex && !mouse.isDragged) {
      player.requestMove(hoveredTile.tileIndex);
      hoveredTile.path.length = 0;
      scene.redrawEffects = true;
    }
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
  };
};

playMode.unset = () => {
  const { mouse, player } = scene;
  player.unsetPath();
  mouse.onMouseMove = noop;
  mouse.onMouseUp = noop;
};

export { playMode };

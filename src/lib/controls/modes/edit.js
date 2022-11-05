import { scene, panCameraKeys, panCameraTo } from "../../scene";
import { findPath } from "../../find-path";
import { resetBrushes } from "../../../jsx/tile-painter";
import {
  findHoveredTile,
  paintTile,
  unsetTileLock,
  highlightTile,
} from "../../map";
import {
  hoveredTileOutlineColor,
  pathTileOutlineColor,
  pathTileUnderOutlineColor,
} from "../../constants";

const editMode = {};
const noop = () => {};

editMode.set = () => {
  const { hoveredTile, mouse, player, canvas4 } = scene;

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
        canvas4.style.cursor = "grabbing";
      } else {
        canvas4.style.cursor = "pointer";
      }

      hoveredTile.path = findPath(player.tileIndex, hoveredTile.tileIndex);

      if (mouse.buttonCode === 3) paintTile(hoveredTile.tileIndex);
    } else {
      canvas4.style.cursor = "default";
    }
  };

  scene.effectsMiddle = () => {
    if (hoveredTile.tileIndex) {
      hoveredTile.path.forEach((tileIndex) => {
        highlightTile(
          { x: tileIndex[1], y: tileIndex[0] },
          pathTileOutlineColor
        );
      });
    }
  };

  scene.effectsTop = () => {
    if (hoveredTile.tileIndex) {
      hoveredTile.path.forEach((tileIndex) => {
        highlightTile(
          { x: tileIndex[1], y: tileIndex[0] },
          pathTileUnderOutlineColor
        );
      });

      highlightTile(hoveredTile.tileIndex, hoveredTileOutlineColor);
    }
  };
};

editMode.unset = () => {
  const { mouse, player } = scene;
  player.unsetPath();
  mouse.onMouseMove = noop;
  mouse.onMouseUp = noop;
  scene.effectsMiddle = noop;
  scene.effectsTop = noop;
};

export { editMode };

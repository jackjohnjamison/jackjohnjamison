import { scene, panCameraKeys, panCameraTo } from "../../scene";
import { findPath } from "../../find-path";
import { findHoveredTile, tileIndexToPosition } from "../../map";
import { breadcrumbTrail, drawEllipse } from "../../effects";
import { baseMarkerSize } from "../../constants";

const playMode = {};
const noop = () => {};

playMode.set = () => {
  const { hoveredTile, mouse, player, ctx } = scene;

  mouse.onMouseMove = () => {
    if (mouse.buttonCode === 1) {
      panCameraTo(-mouse.drag.x, -mouse.drag.y);
    }
  };

  mouse.onMouseUp = () => {
    if (mouse.buttonCode === 1 && hoveredTile.tileIndex && !mouse.isDragged) {
      player.requestMove(hoveredTile.tileIndex);
    }
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
    } else {
      scene.canvas.style.cursor = "default";
    }
  };

  scene.effectsMiddle = () => {
    if (player.isMoving) {
      breadcrumbTrail(player.path, "lime", true);
    } else if (hoveredTile.tileIndex) {
      breadcrumbTrail(hoveredTile.path, "lime");
    }
  };

  scene.effectsTop = () => {
    if (hoveredTile.tileIndex) {
      const position = tileIndexToPosition(hoveredTile.tileIndex);
      drawEllipse(position, "lime", baseMarkerSize, ctx);
    }

    if (player.isMoving) {
      breadcrumbTrail(player.path, "rgba(50, 205, 50, 0.5)", true);
    } else if (hoveredTile.tileIndex) {
      breadcrumbTrail(hoveredTile.path, "rgba(50, 205, 50, 0.5)");
    }
  };
};

playMode.unset = () => {
  const { mouse, player } = scene;
  player.unsetPath();
  mouse.onMouseMove = noop;
  mouse.onMouseUp = noop;
  scene.effectsMiddle = noop;
  scene.effectsTop = noop;
};

export { playMode };

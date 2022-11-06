import { scene, panCameraKeys, panCameraTo } from "../../scene";
import { findPath } from "../../find-path";
import {
  findHoveredTile,
  tileIndexToPosition,
  isWalkable,
  highlightTile,
} from "../../map";
import { breadcrumbTrail, drawEllipse } from "../../effects";
import { baseMarkerSize, hoveredTileOutlineColor } from "../../constants";

const playMode = {};
const noop = () => {};

playMode.set = () => {
  const { hoveredTile, mouse, player, ctxMid, ctxTop, canvasTop } = scene;

  mouse.onMouseMove = () => {
    if (mouse.buttonCode === 1) {
      panCameraTo(-mouse.drag.x, -mouse.drag.y);
    }
  };

  mouse.onMouseUp = () => {
    if (mouse.buttonCode === 1 && hoveredTile.tileIndex && !mouse.isDragged) {
      player.requestMove(hoveredTile.tileIndex);
      hoveredTile.path.length = 0;
    }
  };

  scene.onFrameControls = (delta) => {
    panCameraKeys(delta);

    hoveredTile.tileIndex = findHoveredTile({ x: mouse.x, y: mouse.y });

    if (hoveredTile.tileIndex) {
      if (
        hoveredTile.tileIndex.x !== hoveredTile.tileIndexPrevious?.x ||
        hoveredTile.tileIndex.y !== hoveredTile.tileIndexPrevious?.y
      ) {
        if (mouse.isDragged) {
          canvasTop.style.cursor = "grabbing";
        } else {
          canvasTop.style.cursor = "pointer";
        }

        if (!player.isMoving) {
          hoveredTile.path = findPath(player.tileIndex, hoveredTile.tileIndex);
        }

        hoveredTile.tileIndexPrevious = {
          x: hoveredTile.tileIndex.x,
          y: hoveredTile.tileIndex.y,
        };
      }
    } else {
      canvasTop.style.cursor = "default";
    }
  };

  scene.effectsMiddle = () => {
    if (player.isMoving) {
      breadcrumbTrail(player.path, "lime", false, ctxMid);
    } else if (hoveredTile.tileIndex) {
      breadcrumbTrail(hoveredTile.path, "lime", false, ctxMid);
    }
  };

  scene.effectsTop = () => {
    if (player.isMoving) {
      breadcrumbTrail(player.path, "rgba(50, 205, 50, 0.5)", true, ctxTop);

      if (hoveredTile.tileIndex) {
        // Can we stop this recalculating or redrawing when the mouse isn't moving?
        if (isWalkable(hoveredTile.tileIndex)) {
          const position = tileIndexToPosition(hoveredTile.tileIndex);
          drawEllipse(
            position,
            hoveredTileOutlineColor,
            baseMarkerSize,
            ctxTop
          );
        } else {
          highlightTile(hoveredTile.tileIndex, hoveredTileOutlineColor);
        }
      }
    } else if (hoveredTile.tileIndex) {
      breadcrumbTrail(
        hoveredTile.path,
        "rgba(50, 205, 50, 0.5)",
        false,
        ctxTop
      );

      if (hoveredTile.tileIndex) {
        if (isWalkable(hoveredTile.tileIndex)) {
          const position = tileIndexToPosition(hoveredTile.tileIndex);
          drawEllipse(position, "lime", baseMarkerSize, ctxTop);
        } else {
          highlightTile(hoveredTile.tileIndex, hoveredTileOutlineColor);
        }
      }
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

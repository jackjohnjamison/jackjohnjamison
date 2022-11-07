import { scene, panCameraKeys, panCameraTo } from "../../scene";
import { findPath } from "../../find-path";
import {
  findHoveredTile,
  tileIndexToPosition,
  isWalkable,
  highlightTile,
} from "../../map";
import { breadcrumbTrail, drawEllipse } from "../../effects";
import { baseMarkerSize, hoveredTileOutlineColor, noop } from "../../constants";

const playMode = {};

playMode.set = () => {
  const {
    hoveredTile,
    mouse,
    player,
    ctxMid,
    ctxTop,
    canvasTop,
    view: { translate },
  } = scene;

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
      const tileIndexChanged =
        hoveredTile.tileIndex.x !== hoveredTile.tileIndexPrevious?.x ||
        hoveredTile.tileIndex.y !== hoveredTile.tileIndexPrevious?.y;

      // Cursor state
      if (mouse.isDragged) {
        canvasTop.style.cursor = "grabbing";
      } else {
        canvasTop.style.cursor = "pointer";
      }

      // Breadcrumb state
      if (tileIndexChanged || scene.redrawEffects) {
        const { width, height } = canvasTop;
        ctxMid.clearRect(-translate.x, -translate.y, width, height);
        ctxTop.clearRect(-translate.x, -translate.y, width, height);

        if (player.isMoving) {
          breadcrumbTrail(player.path, "lime", false, ctxMid);
          breadcrumbTrail(player.path, "rgba(50, 205, 50, 0.5)", true, ctxTop);

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
        } else {
          hoveredTile.path = findPath(player.tileIndex, hoveredTile.tileIndex);

          breadcrumbTrail(hoveredTile.path, "lime", false, ctxMid);
          breadcrumbTrail(
            hoveredTile.path,
            "rgba(50, 205, 50, 0.5)",
            false,
            ctxTop
          );
          if (isWalkable(hoveredTile.tileIndex)) {
            const position = tileIndexToPosition(hoveredTile.tileIndex);
            drawEllipse(position, "lime", baseMarkerSize, ctxTop);
          } else {
            highlightTile(hoveredTile.tileIndex, hoveredTileOutlineColor);
          }
        }

        hoveredTile.tileIndexPrevious = {
          x: hoveredTile.tileIndex.x,
          y: hoveredTile.tileIndex.y,
        };
        scene.redrawEffects = false;
      }
    } else {
      canvasTop.style.cursor = "default";
    }
  };
};

playMode.unset = () => {
  const { mouse, player } = scene;
  player.unsetPath();
  mouse.onMouseMove = noop;
  mouse.onMouseUp = noop;
};

export { playMode };

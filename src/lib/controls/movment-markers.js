import { scene } from "../scene";
import { findPath } from "../find-path";
import { tileIndexToPosition, isWalkable, highlightTile } from "../map";
import { breadcrumbTrail, drawEllipse } from "../effects";
import { baseMarkerSize, hoveredTileOutlineColor } from "../constants";

let hoveredTileIndexPrevious = null;

const movementMarkers = (hoveredTileIndex) => {
  const {
    hoveredTile,
    player,
    ctxMid,
    ctxTop,
    canvasTop,
    view: { translate },
  } = scene;

  const tileIndexChanged =
    JSON.stringify(hoveredTileIndex) !== hoveredTileIndexPrevious;

  // Breadcrumb state
  if (tileIndexChanged || scene.redrawEffects) {
    const { width, height } = canvasTop;
    ctxMid.clearRect(-translate.x, -translate.y, width, height);
    ctxTop.clearRect(-translate.x, -translate.y, width, height);

    if (player.isMoving) {
      breadcrumbTrail(player.path, "lime", false, ctxMid);
      breadcrumbTrail(player.path, "rgba(200, 200, 200, 0.8)", true, ctxTop);
    }

    if (hoveredTileIndex) {
      if (player.isMoving) {
        if (isWalkable(hoveredTileIndex)) {
          const position = tileIndexToPosition(hoveredTileIndex);
          drawEllipse(
            position,
            hoveredTileOutlineColor,
            baseMarkerSize,
            ctxTop
          );
        } else {
          highlightTile(hoveredTileIndex, hoveredTileOutlineColor);
        }
      } else {
        hoveredTile.path = findPath(player.tileIndex, hoveredTileIndex);
        breadcrumbTrail(hoveredTile.path, "lime", false, ctxMid);
        breadcrumbTrail(
          hoveredTile.path,
          "rgba(200, 200, 200, 0.8)",
          false,
          ctxTop
        );
        if (isWalkable(hoveredTileIndex)) {
          const position = tileIndexToPosition(hoveredTileIndex);
          drawEllipse(position, "lime", baseMarkerSize, ctxTop);
        } else {
          highlightTile(hoveredTileIndex, hoveredTileOutlineColor);
        }
      }
    }
    hoveredTileIndexPrevious = JSON.stringify(hoveredTileIndex);
    scene.redrawEffects = false;
  }
};

export { movementMarkers };

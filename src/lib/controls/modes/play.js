import { scene, panCameraKeys, panCameraTo } from "../../scene";
import { findPath } from "../../find-path";
import {
  findHoveredTile,
  tileIndexToPosition,
  positionToTileIndex, //
  isWalkable,
  highlightTile,
} from "../../map";
import { breadcrumbTrail, drawEllipse } from "../../effects";
import {
  baseMarkerSize,
  hoveredTileOutlineColor,
  tileWidth,
  tileHeight /* */,
} from "../../constants";

const playMode = {};
const noop = () => {};

playMode.set = () => {
  const { hoveredTile, mouse, player, ctx, view } = scene;

  mouse.onMouseMove = () => {
    // if (mouse.buttonCode === 1) {
    //   panCameraTo(-dragX, -dragY);
    // }
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
      breadcrumbTrail(player.path, "lime");
    } else if (hoveredTile.tileIndex) {
      breadcrumbTrail(hoveredTile.path, "lime");
    }
  };

  scene.effectsTop = () => {
    if (player.isMoving) {
      breadcrumbTrail(player.path, "rgba(50, 205, 50, 0.5)", true, "lime");

      if (hoveredTile.tileIndex) {
        if (isWalkable(hoveredTile.tileIndex)) {
          const position = tileIndexToPosition(hoveredTile.tileIndex);
          drawEllipse(position, hoveredTileOutlineColor, baseMarkerSize, ctx);
        } else {
          highlightTile(hoveredTile.tileIndex, hoveredTileOutlineColor);
        }
      }
    } else if (hoveredTile.tileIndex) {
      breadcrumbTrail(hoveredTile.path, "rgba(50, 205, 50, 0.5)");

      if (hoveredTile.tileIndex) {
        if (isWalkable(hoveredTile.tileIndex)) {
          const position = tileIndexToPosition(hoveredTile.tileIndex);
          drawEllipse(position, "lime", baseMarkerSize, ctx);
        } else {
          highlightTile(hoveredTile.tileIndex, hoveredTileOutlineColor);
        }
      }
    }

    ////////////////////////////////////////////////////////////////////

    ctx.strokeStyle = "aqua";
    ctx.beginPath();

    const { translate } = scene.view;

    const hWidth = tileWidth / 2;
    const hHeight = tileHeight / 2;

    const startX = mouse.dragStart.x;
    const startY = mouse.dragStart.y;

    const dragX = mouse.drag.x + translate.x;
    const dragY = mouse.drag.y + translate.y;

    const tl = {
      x: startX - hWidth,
      y: startY - hHeight,
    };
    const bl = {
      x: startX - hWidth,
      y: startY - dragY + hHeight,
    };
    const tr = {
      x: startX - dragX + hWidth,
      y: startY - hHeight,
    };
    const br = {
      x: startX - dragX + hWidth,
      y: startY - dragY + hHeight,
    };

    ctx.rect(startX, startY, -dragX, -dragY);
    ctx.stroke();

    const tl_index = positionToTileIndex(tl);
    const tr_index = positionToTileIndex(tr);
    const bl_index = positionToTileIndex(bl);

    highlightTile(tl_index, "red");
    highlightTile(positionToTileIndex(bl), "green");
    highlightTile(tr_index, "blue");
    highlightTile(positionToTileIndex(br), "yellow");

    const indexDiffX = tr_index.x - tl_index.x + 1;
    const indexDiffY = bl_index.y - tl_index.y + 1;

    for (let i = 0; i < indexDiffX; i++) {
      for (let j = 0; j < indexDiffY; j++) {
        highlightTile(
          {
            x: tl_index.x + i - j,
            y: tl_index.y + i + j,
          },
          "yellow"
        );
      }

      for (let j = 0; j < indexDiffY; j++) {
        highlightTile(
          {
            x: tl_index.x + i - 1 - j,
            y: tl_index.y + i + j,
          },
          "red"
        );
      }
    }

    /////////////////////////////////////////////////////////////////////////////
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

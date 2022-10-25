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
  const { hoveredTile, mouse, player, ctx } = scene;

  mouse.onMouseMove = () => {
    // if (mouse.buttonCode === 1) {
    //   panCameraTo(-mouse.drag.x, -mouse.drag.y);
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

    // const tl = { x: mouse.dragStart.x, y: mouse.dragStart.y };
    // const bl = { x: mouse.dragStart.x, y: mouse.dragStart.y - mouse.drag.y };
    // const tr = { x: mouse.dragStart.x - mouse.drag.x, y: mouse.dragStart.y };
    // const br = {
    //   x: mouse.dragStart.x - mouse.drag.x,
    //   y: mouse.dragStart.y - mouse.drag.y,
    // };

    const hWidth = tileWidth / 2;
    const hHeight = tileHeight / 2;

    const tl = {
      x: mouse.dragStart.x - hWidth,
      y: mouse.dragStart.y - hHeight,
    };
    const bl = {
      x: mouse.dragStart.x - hWidth,
      y: mouse.dragStart.y - mouse.drag.y + hHeight,
    };
    const tr = {
      x: mouse.dragStart.x - mouse.drag.x + hWidth,
      y: mouse.dragStart.y - hHeight,
    };
    const br = {
      x: mouse.dragStart.x - mouse.drag.x + hWidth,
      y: mouse.dragStart.y - mouse.drag.y + hHeight,
    };

    ctx.rect(
      mouse.dragStart.x,
      mouse.dragStart.y,
      -mouse.drag.x,
      -mouse.drag.y
    );
    ctx.stroke();

    highlightTile(positionToTileIndex(tl), "blue");
    highlightTile(positionToTileIndex(bl), "blue");
    highlightTile(positionToTileIndex(tr), "blue");
    highlightTile(positionToTileIndex(br), "blue");

    const tlTileIndex = positionToTileIndex(tl);
    const trTileIndex = positionToTileIndex(tr);

    const xDiff = trTileIndex.x - tlTileIndex.x;
    const yDiff = trTileIndex.y - tlTileIndex.y;

    const maxDiff = Math.max(xDiff, yDiff);

    // const rangeArray = Array.from(
    //   { length: maxDiff },
    //   (_, i) => i + tlTileIndex.x
    // );

    // rangeArray.forEach((tileX, i) => {
    //   highlightTile({ x: tileX, y: tlTileIndex.y + i + 1 }, "purple");
    // });

    // const tileIndexToPosition = ({ x, y }) => {
    //   const { origin } = scene.view;

    //   return {
    //     x: (x * tileWidth) / 2 + (y * tileWidth) / 2 + origin.x,
    //     y: (y * tileHeight) / 2 - (x * tileHeight) / 2 + origin.y,
    //   };
    // };

    console.log(tl.x);

    const isoToPos = ({ x, y }) => {
      return {
        x: x / 2 + y / 2 + tlTileIndex.x,
        y: y / 2 - x / 2 + tlTileIndex.y,
      };
    };

    for (let x = tlTileIndex.x; x < tlTileIndex.x + xDiff; x++) {
      for (let y = tlTileIndex.y; y < tlTileIndex.y + yDiff; y++) {
        const pos = isoToPos({ x: -x, y: y });
        // console.log(pos.y, -pos.y);
        // const pos = tileIndexToPosition({ x, y });
        highlightTile({ x: pos.x, y: pos.y }, "purple");
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

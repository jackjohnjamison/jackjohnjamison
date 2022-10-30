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
  tileHeight,
  tileHalfWidth,
  tileHalfHeight,
  tileDimensionRatio,
} from "../../constants";

const playMode = {};
const noop = () => {};

playMode.set = () => {
  const { hoveredTile, mouse, player, ctx, view } = scene;

  mouse.onMouseMove = () => {
    // if (mouse.buttonCode === 1) {
    //   panCameraTo(-areaWidth, -areaHeight);
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

    const originX = mouse.dragStart.x;
    const originY = mouse.dragStart.y;

    const areaWidth = -mouse.drag.x - translate.x;
    const areaHeight = -mouse.drag.y - translate.y;

    ctx.rect(originX, originY, areaWidth, areaHeight);
    ctx.stroke();

    // Collumn offset
    const startTile = positionToTileIndex({ x: originX, y: originY });
    const startTileOrigin = tileIndexToPosition(startTile);
    const centerPointX = startTileOrigin.x + tileHalfWidth;
    const centerPointY = startTileOrigin.y + tileHalfHeight;

    const distanceFromCenterX = originX - centerPointX;
    const distanceFromCenterY = originY - centerPointY;

    ////////////////////////////////////////

    // Distance to next offset tile
    const distanceToNextOffsetTileX =
      tileWidth -
      (originX - startTileOrigin.x) -
      Math.abs(distanceFromCenterY) / tileDimensionRatio;

    const distanceToNextOffsetTileY =
      tileHeight -
      (originY - startTileOrigin.y) -
      Math.abs(distanceFromCenterX) * tileDimensionRatio;

    ////////////////////////////////////////

    const distanceToNextTileX =
      tileWidth -
      (originX - startTileOrigin.x) +
      Math.abs(distanceFromCenterY) / tileDimensionRatio;

    const distanceToNextTileY =
      tileHeight -
      (originY - startTileOrigin.y) +
      Math.abs(distanceFromCenterX) * tileDimensionRatio;

    const xTileCount = Math.ceil(
      (areaWidth - distanceToNextTileX) / tileWidth + 1
    );

    const yTileCount = Math.ceil(
      (areaHeight - distanceToNextTileY) / tileHeight + 1
    );

    for (let x = 0; x < xTileCount; x++) {
      for (let y = 0; y < yTileCount; y++) {
        const tile = {
          x: startTile.x + x - y,
          y: startTile.y + x + y,
        };
        highlightTile(tile, "yellow");
      }
    }

    const xOffsetTileCount = Math.ceil(
      (areaWidth - distanceToNextOffsetTileX) / tileWidth
    );

    const yOffsetTileCount = Math.ceil(
      (areaHeight - distanceToNextOffsetTileY) / tileHeight
    );

    for (let x = 0; x < xOffsetTileCount; x++) {
      for (let y = 0; y < yOffsetTileCount; y++) {
        const tile = {
          x: startTile.x + x + 1 - y,
          y: startTile.y + x + y,
        };
        highlightTile(tile, "orange");
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

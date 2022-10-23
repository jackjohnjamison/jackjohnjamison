import { scene } from ".";
import { highlightTile } from "../map";
import {
  hoveredTileOutlineColor,
  pathTileOutlineColor,
  pathTileUnderOutlineColor,
} from "../constants";

const renderFrame = (delta) => {
  const { ctx, canvas, floorCanvas, entityCanvas, view, hoveredTile } = scene;
  const { translate } = view;

  ctx.clearRect(-translate.x, -translate.y, canvas.width, canvas.height);
  ctx.drawImage(floorCanvas, 0, 0);

  if (hoveredTile.tileIndex) {
    hoveredTile.path.forEach((tileIndex) => {
      highlightTile({ x: tileIndex[1], y: tileIndex[0] }, pathTileOutlineColor);
    });
  }

  scene.entities.forEach((entity) => {
    entity.update(delta);
  });

  ctx.drawImage(entityCanvas, 0, 0);

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

const renderStaticFrame = () => {
  const { ctx, canvas, floorCanvas, entityCanvas, view } = scene;
  const { translate } = view;

  ctx.clearRect(-translate.x, -translate.y, canvas.width, canvas.height);
  ctx.drawImage(floorCanvas, 0, 0);
  ctx.drawImage(entityCanvas, 0, 0);
};

export { renderFrame, renderStaticFrame };

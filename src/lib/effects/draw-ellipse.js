import {
  tileHalfWidth,
  tileHalfHeight,
  tileDimensionRatio,
  radians360,
} from "../constants";

const drawEllipse = (position, color, radius, ctx) => {
  const centerX = position.x + tileHalfWidth;
  const centerY = position.y + tileHalfHeight;

  ctx.strokeStyle = color;

  ctx.beginPath();
  ctx.ellipse(
    centerX,
    centerY,
    radius,
    radius * tileDimensionRatio,
    0,
    0,
    radians360
  );
  ctx.stroke();
};

export { drawEllipse };

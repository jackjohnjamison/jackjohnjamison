import {
  centerOffsetX,
  centerOffsetY,
  tileRatio,
  radians360,
} from "../constants";

const drawEllipse = (position, color, radius, ctx) => {
  const centerX = position.x + centerOffsetX;
  const centerY = position.y + centerOffsetY;

  ctx.strokeStyle = color;

  ctx.beginPath();
  ctx.ellipse(centerX, centerY, radius, radius * tileRatio, 0, 0, radians360);
  ctx.stroke();
};

export { drawEllipse };

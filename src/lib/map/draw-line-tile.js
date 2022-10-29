import { scene } from "../scene";
import { tileIndexToPosition } from ".";
import { tileWidth, tileHeight } from "../constants";

const drawLineTile = ({ x, y, strokeColor, fillColor }) => {
  const { ctx } = scene;

  const position = tileIndexToPosition({ x, y });
  ctx.strokeStyle = strokeColor;
  ctx.fillStyle = fillColor;

  // Draw tile outline
  ctx.beginPath();
  ctx.moveTo(position.x, position.y + tileHeight / 2);
  ctx.lineTo(position.x + tileWidth / 2, position.y);
  ctx.lineTo(position.x + tileWidth, position.y + tileHeight / 2);
  ctx.lineTo(position.x + tileWidth / 2, position.y + tileHeight);
  ctx.closePath();

  ctx.fill();
  ctx.stroke();
};

export { drawLineTile };

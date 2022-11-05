import { scene } from "../scene";
import { tileIndexToPosition } from ".";
import { tileWidth, tileHeight } from "../constants";

const drawLineTile = ({ x, y, strokeColor, fillColor }) => {
  const { ctxTop } = scene;

  const position = tileIndexToPosition({ x, y });
  ctxTop.strokeStyle = strokeColor;
  ctxTop.fillStyle = fillColor;

  // Draw tile outline
  ctxTop.beginPath();
  ctxTop.moveTo(position.x, position.y + tileHeight / 2);
  ctxTop.lineTo(position.x + tileWidth / 2, position.y);
  ctxTop.lineTo(position.x + tileWidth, position.y + tileHeight / 2);
  ctxTop.lineTo(position.x + tileWidth / 2, position.y + tileHeight);
  ctxTop.closePath();

  ctxTop.fill();
  ctxTop.stroke();
};

export { drawLineTile };

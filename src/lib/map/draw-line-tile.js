import { scene } from "../scene";
import { tileIndexToPosition } from ".";
import { tileWidth, tileHeight } from "../constants";

const drawLineTile = ({ x, y, strokeColor, fillColor }) => {
  const { ctx4 } = scene;

  const position = tileIndexToPosition({ x, y });
  ctx4.strokeStyle = strokeColor;
  ctx4.fillStyle = fillColor;

  // Draw tile outline
  ctx4.beginPath();
  ctx4.moveTo(position.x, position.y + tileHeight / 2);
  ctx4.lineTo(position.x + tileWidth / 2, position.y);
  ctx4.lineTo(position.x + tileWidth, position.y + tileHeight / 2);
  ctx4.lineTo(position.x + tileWidth / 2, position.y + tileHeight);
  ctx4.closePath();

  ctx4.fill();
  ctx4.stroke();
};

export { drawLineTile };

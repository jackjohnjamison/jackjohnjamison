import { scene } from "../scene";
import { tileIndexToPosition } from ".";
import { tileWidth, tileHeight } from "../constants";

const drawLineTile = ({ x, y, strokeColor, fillColor }) => {
  const { ctx1 } = scene;

  const position = tileIndexToPosition({ x, y });
  ctx1.strokeStyle = strokeColor;
  ctx1.fillStyle = fillColor;

  // Draw tile outline
  ctx1.beginPath();
  ctx1.moveTo(position.x, position.y + tileHeight / 2);
  ctx1.lineTo(position.x + tileWidth / 2, position.y);
  ctx1.lineTo(position.x + tileWidth, position.y + tileHeight / 2);
  ctx1.lineTo(position.x + tileWidth / 2, position.y + tileHeight);
  ctx1.closePath();

  ctx1.fill();
  ctx1.stroke();
};

export { drawLineTile };

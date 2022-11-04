import { scene } from "../scene";
import { tileIndexToPosition } from ".";
import { tileWidth, tileHeight } from "../constants";

const drawLineTile = ({ x, y, strokeColor, fillColor }) => {
  const { topCtx } = scene;

  const position = tileIndexToPosition({ x, y });
  topCtx.strokeStyle = strokeColor;
  topCtx.fillStyle = fillColor;

  // Draw tile outline
  topCtx.beginPath();
  topCtx.moveTo(position.x, position.y + tileHeight / 2);
  topCtx.lineTo(position.x + tileWidth / 2, position.y);
  topCtx.lineTo(position.x + tileWidth, position.y + tileHeight / 2);
  topCtx.lineTo(position.x + tileWidth / 2, position.y + tileHeight);
  topCtx.closePath();

  topCtx.fill();
  topCtx.stroke();
};

export { drawLineTile };

import { scene } from "../scene";
import { tileIndexToPosition } from "../map";
import { drawEllipse } from ".";
import { tileHeight, centerOffsetX, centerOffsetY } from "../constants";

const crumbWidth = 16;
const pinProportion = 0.86;

const transparentFill = "rgba(150, 150, 150, 0.8)";

const breadcrumbTrail = (path, color, pin, pinColor) => {
  const { ctx } = scene;
  const pathLength = path.length;

  path.forEach((step, i) => {
    const [y, x] = step;
    const position = tileIndexToPosition({ y, x });

    drawEllipse(position, color, crumbWidth, ctx);

    if (pin && i === pathLength - 1) {
      const centerX = position.x + centerOffsetX;
      const centerY = position.y + centerOffsetY;

      ctx.beginPath();
      ctx.moveTo(centerX, centerY);
      ctx.lineTo(
        centerX - crumbWidth / 3,
        centerY - tileHeight * pinProportion * 1.5
      );
      ctx.lineTo(centerX, centerY - tileHeight * 1.5);
      ctx.lineTo(
        centerX + crumbWidth / 3,
        centerY - tileHeight * pinProportion * 1.5
      );
      ctx.closePath();

      ctx.fillStyle = transparentFill;
      ctx.strokeStyle = pinColor;

      ctx.fill();
      ctx.stroke();
    }
  });
};

export { breadcrumbTrail };

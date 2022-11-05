import { scene } from "../scene";
import { tileIndexToPosition } from "../map";
import { drawEllipse } from ".";
import { tileHeight, centerOffsetX, centerOffsetY } from "../constants";

const crumbWidth = 16;
const pinProportion = 0.86;

const transparentFill = "rgba(150, 150, 150, 0.8)";

const breadcrumbTrail = (path, color, pin, pinColor) => {
  const { ctx1 } = scene;
  const pathLength = path.length;

  path.forEach((step, i) => {
    const [y, x] = step;
    const position = tileIndexToPosition({ y, x });

    drawEllipse(position, color, crumbWidth, ctx1);

    if (pin && i === pathLength - 1) {
      const centerX = position.x + centerOffsetX;
      const centerY = position.y + centerOffsetY;

      ctx1.beginPath();
      ctx1.moveTo(centerX, centerY);
      ctx1.lineTo(
        centerX - crumbWidth / 3,
        centerY - tileHeight * pinProportion * 1.5
      );
      ctx1.lineTo(centerX, centerY - tileHeight * 1.5);
      ctx1.lineTo(
        centerX + crumbWidth / 3,
        centerY - tileHeight * pinProportion * 1.5
      );
      ctx1.closePath();

      ctx1.fillStyle = transparentFill;
      ctx1.strokeStyle = pinColor;

      ctx1.fill();
      ctx1.stroke();
    }
  });
};

export { breadcrumbTrail };

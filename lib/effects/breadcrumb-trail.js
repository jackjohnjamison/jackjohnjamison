import { scene } from "../scene";
import { tileIndexToPosition } from "../map";
import { tileHeight, tileWidth } from "../constants";

const centerOffsetX = tileWidth / 2;
const centerOffsetY = tileHeight / 2;

const crumbWidth = 16;
const crumbHeight = 8;

const destinationWidth = 16;
const destinationHeight = 8;

const radians360 = 6.28319;

const breadcrumbTrail = (path, color) => {
  const { ctx } = scene;
  const pathLength = path.length;

  path.forEach((step, i) => {
    const [y, x] = step;
    console.log(x, y);
    const position = tileIndexToPosition({ x, y });
    console.log(position);
    console.log(step);

    const centerX = position.x + centerOffsetX;
    const centerY = position.y + centerOffsetY;

    ctx.strokeStyle = color;

    ctx.beginPath();
    ctx.ellipse(centerX, centerY, crumbWidth, crumbHeight, 0, 0, radians360);

    ctx.stroke();
  });
};

export { breadcrumbTrail };

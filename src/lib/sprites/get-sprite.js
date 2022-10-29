import { sprites } from "./sprites";

const canvas = new OffscreenCanvas(0, 0);
const ctx = canvas.getContext("2d");

const colorize = (sprite, color) => {
  const {
    data,
    data: { width, height },
    yOffset,
  } = sprite;

  canvas.width = width;
  canvas.height = height;

  const image = data;
  ctx.filter = `hue-rotate(${color}deg)`;
  ctx.drawImage(image, 0, 0);

  return {
    data: canvas,
    yOffset,
  };
};

const getSpriteImage = (spriteName, color, variant) => {
  const sprite = sprites[spriteName][variant];

  return colorize(sprite, color);
};

export { getSpriteImage };

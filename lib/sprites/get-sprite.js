import { sprites } from "./sprites";

const spriteStore = {};

const colorize = (sprite, color) => {
  const canvas = new OffscreenCanvas(sprite.data.width, sprite.data.height);
  const ctx = canvas.getContext("2d");
  const image = sprite.data;
  ctx.filter = `hue-rotate(${color}deg)`;
  ctx.drawImage(image, 0, 0);

  // Bellow are a couple of event listeners trying to find an intermittent bug
  // Hopefully they can just be deleted at some point
  canvas.addEventListener("contextlost", () => {
    console.log("*** FUCK ***");
  });

  canvas.addEventListener("contextrestored", () => {
    ctx.filter = `hue-rotate(${color}deg)`;
    ctx.drawImage(image, 0, 0);

    console.log("*** Restored ***");
  });

  return {
    data: canvas,
    yOffset: sprite.yOffset,
  };
};

const createSpriteImage = (spriteName, color, variant) => {
  if (!spriteStore[spriteName]) {
    spriteStore[spriteName] = {};
  }

  spriteStore[spriteName][color] = {};

  sprites[spriteName].forEach((sprite, i) => {
    spriteStore[spriteName][color][i] = colorize(sprite, color);
  });

  return spriteStore[spriteName][color][variant];
};

const getSpriteImage = (spriteName, color, variant) => {
  return (
    spriteStore[spriteName]?.[color]?.[variant] ||
    createSpriteImage(spriteName, color, variant)
  );
};

export { getSpriteImage };

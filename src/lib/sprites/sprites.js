import { loadImage } from "./load-image";

const imageAssetPath = import.meta.env.DEV ? "./images/" : "/tiles/src/images/";

const sprites = {
  terracotta: [
    {
      yOffset: 0,
      data: await loadImage(`${imageAssetPath}terracotta1.png`),
    },
    {
      yOffset: 0,
      data: await loadImage(`${imageAssetPath}terracotta2.png`),
    },
    {
      yOffset: 0,
      data: await loadImage(`${imageAssetPath}terracotta3.png`),
    },
    {
      yOffset: 0,
      data: await loadImage(`${imageAssetPath}terracotta4.png`),
    },
  ],

  cube: [
    {
      yOffset: 33,
      data: await loadImage(`${imageAssetPath}cube1.png`),
    },
    {
      yOffset: 33,
      data: await loadImage(`${imageAssetPath}cube2.png`),
    },
    {
      yOffset: 33,
      data: await loadImage(`${imageAssetPath}cube3.png`),
    },
  ],

  grass: [
    {
      yOffset: 2,
      data: await loadImage(`${imageAssetPath}grass1.png`),
    },
    {
      yOffset: 2,
      data: await loadImage(`${imageAssetPath}grass2.png`),
    },
    {
      yOffset: 2,
      data: await loadImage(`${imageAssetPath}grass3.png`),
    },
    {
      yOffset: 2,
      data: await loadImage(`${imageAssetPath}grass4.png`),
    },
  ],

  water: [
    {
      yOffset: -3,
      data: await loadImage(`${imageAssetPath}water1.png`),
    },
    {
      yOffset: -3,
      data: await loadImage(`${imageAssetPath}water2.png`),
    },
  ],

  mountain: [
    {
      yOffset: 14,
      data: await loadImage(`${imageAssetPath}mountain1.png`),
    },
    {
      yOffset: 12,
      data: await loadImage(`${imageAssetPath}mountain2.png`),
    },
    {
      yOffset: 14,
      data: await loadImage(`${imageAssetPath}mountain3.png`),
    },
  ],

  mountainTop: [
    {
      yOffset: 14,
      data: await loadImage(`${imageAssetPath}mountain1-top.png`),
    },
    {
      yOffset: 12,
      data: await loadImage(`${imageAssetPath}mountain2-top.png`),
    },
    {
      yOffset: 14,
      data: await loadImage(`${imageAssetPath}mountain3-top.png`),
    },
  ],

  forest: [
    {
      yOffset: 15,
      data: await loadImage(`${imageAssetPath}trees1.png`),
    },
    {
      yOffset: 15,
      data: await loadImage(`${imageAssetPath}trees2.png`),
    },
    {
      yOffset: 15,
      data: await loadImage(`${imageAssetPath}trees3.png`),
    },
    {
      yOffset: 15,
      data: await loadImage(`${imageAssetPath}trees4.png`),
    },
  ],

  forestTop: [
    {
      yOffset: 15,
      data: await loadImage(`${imageAssetPath}trees1-top.png`),
    },
    {
      yOffset: 15,
      data: await loadImage(`${imageAssetPath}trees2-top.png`),
    },
    {
      yOffset: 15,
      data: await loadImage(`${imageAssetPath}trees3-top.png`),
    },
    {
      yOffset: 15,
      data: await loadImage(`${imageAssetPath}trees4-top.png`),
    },
  ],

  playerTokens: {
    angel: {
      yOffset: 51,
      data: await loadImage(`${imageAssetPath}pt-angel.png`),
    },
    despoiler: {
      yOffset: 51,
      data: await loadImage(`${imageAssetPath}pt-despoiler.png`),
    },
    sheild: {
      yOffset: 48,
      data: await loadImage(`${imageAssetPath}pt-sheild.png`),
    },
  },
};

export { sprites };

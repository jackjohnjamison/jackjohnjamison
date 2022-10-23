import { loadImage } from "./load-image";

const sprites = {
  terracotta: [
    {
      yOffset: 0,
      data: await loadImage("../../images/terracotta1.png"),
    },
    {
      yOffset: 0,
      data: await loadImage("../../images/terracotta2.png"),
    },
    {
      yOffset: 0,
      data: await loadImage("../../images/terracotta3.png"),
    },
    {
      yOffset: 0,
      data: await loadImage("../../images/terracotta4.png"),
    },
  ],

  cube: [
    {
      yOffset: 33,
      data: await loadImage("../../images/cube1.png"),
    },
    {
      yOffset: 33,
      data: await loadImage("../../images/cube2.png"),
    },
    {
      yOffset: 33,
      data: await loadImage("../../images/cube3.png"),
    },
  ],

  grass: [
    {
      yOffset: 2,
      data: await loadImage("../../images/grass1.png"),
    },
    {
      yOffset: 2,
      data: await loadImage("../../images/grass2.png"),
    },
    {
      yOffset: 2,
      data: await loadImage("../../images/grass3.png"),
    },
    {
      yOffset: 2,
      data: await loadImage("../../images/grass4.png"),
    },
  ],

  water: [
    {
      yOffset: -3,
      data: await loadImage("../../images/water1.png"),
    },
    {
      yOffset: -3,
      data: await loadImage("../../images/water2.png"),
    },
  ],

  mountain: [
    {
      yOffset: 14,
      data: await loadImage("../../images/mountain1.png"),
    },
    {
      yOffset: 12,
      data: await loadImage("../../images/mountain2.png"),
    },
    {
      yOffset: 14,
      data: await loadImage("../../images/mountain3.png"),
    },
  ],

  mountainTop: [
    {
      yOffset: 14,
      data: await loadImage("../../images/mountain1-top.png"),
    },
    {
      yOffset: 12,
      data: await loadImage("../../images/mountain2-top.png"),
    },
    {
      yOffset: 14,
      data: await loadImage("../../images/mountain3-top.png"),
    },
  ],

  forest: [
    {
      yOffset: 15,
      data: await loadImage("../../images/trees1.png"),
    },
    {
      yOffset: 15,
      data: await loadImage("../../images/trees2.png"),
    },
    {
      yOffset: 15,
      data: await loadImage("../../images/trees3.png"),
    },
    {
      yOffset: 15,
      data: await loadImage("../../images/trees4.png"),
    },
  ],

  forestTop: [
    {
      yOffset: 15,
      data: await loadImage("../../images/trees1-top.png"),
    },
    {
      yOffset: 15,
      data: await loadImage("../../images/trees2-top.png"),
    },
    {
      yOffset: 15,
      data: await loadImage("../../images/trees3-top.png"),
    },
    {
      yOffset: 15,
      data: await loadImage("../../images/trees4-top.png"),
    },
  ],

  playerTokens: {
    angel: {
      yOffset: 51,
      data: await loadImage("../../images/pt-angel.png"),
    },
    despoiler: {
      yOffset: 51,
      data: await loadImage("../../images/pt-despoiler.png"),
    },
    sheild: {
      yOffset: 48,
      data: await loadImage("../../images/pt-sheild.png"),
    },
  },
};

export { sprites };

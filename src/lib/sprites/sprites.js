import { loadImage } from "./load-image";

const sprites = {};

const imageAssetPath = import.meta.env.PROD
  ? "/tiles/src/images/"
  : "./images/";

sprites.load = async () => {
  const terracotta1 = loadImage(`${imageAssetPath}terracotta1.png`);
  const terracotta2 = loadImage(`${imageAssetPath}terracotta2.png`);
  const terracotta3 = loadImage(`${imageAssetPath}terracotta3.png`);
  const terracotta4 = loadImage(`${imageAssetPath}terracotta4.png`);

  const cube1 = loadImage(`${imageAssetPath}cube1.png`);
  const cube2 = loadImage(`${imageAssetPath}cube2.png`);
  const cube3 = loadImage(`${imageAssetPath}cube3.png`);

  const grass1 = loadImage(`${imageAssetPath}grass1.png`);
  const grass2 = loadImage(`${imageAssetPath}grass2.png`);
  const grass3 = loadImage(`${imageAssetPath}grass3.png`);
  const grass4 = loadImage(`${imageAssetPath}grass4.png`);

  const water1 = loadImage(`${imageAssetPath}water1.png`);
  const water2 = loadImage(`${imageAssetPath}water2.png`);

  const mountain1 = loadImage(`${imageAssetPath}mountain1.png`);
  const mountain2 = loadImage(`${imageAssetPath}mountain2.png`);
  const mountain3 = loadImage(`${imageAssetPath}mountain3.png`);

  const mountainTop1 = loadImage(`${imageAssetPath}mountain1-top.png`);
  const mountainTop2 = loadImage(`${imageAssetPath}mountain2-top.png`);
  const mountainTop3 = loadImage(`${imageAssetPath}mountain3-top.png`);

  const forest1 = loadImage(`${imageAssetPath}trees1.png`);
  const forest2 = loadImage(`${imageAssetPath}trees2.png`);
  const forest3 = loadImage(`${imageAssetPath}trees3.png`);
  const forest4 = loadImage(`${imageAssetPath}trees4.png`);

  const forestTop1 = loadImage(`${imageAssetPath}trees1-top.png`);
  const forestTop2 = loadImage(`${imageAssetPath}trees2-top.png`);
  const forestTop3 = loadImage(`${imageAssetPath}trees3-top.png`);
  const forestTop4 = loadImage(`${imageAssetPath}trees4-top.png`);

  const angel = loadImage(`${imageAssetPath}pt-angel.png`);
  const despoiler = loadImage(`${imageAssetPath}pt-despoiler.png`);
  const sheild = loadImage(`${imageAssetPath}pt-sheild.png`);

  sprites.terracotta = [
    {
      yOffset: 0,
      data: await terracotta1,
    },
    {
      yOffset: 0,
      data: await terracotta2,
    },
    {
      yOffset: 0,
      data: await terracotta3,
    },
    {
      yOffset: 0,
      data: await terracotta4,
    },
  ];

  sprites.cube = [
    {
      yOffset: 33,
      data: await cube1,
    },
    {
      yOffset: 33,
      data: await cube2,
    },
    {
      yOffset: 33,
      data: await cube3,
    },
  ];

  sprites.grass = [
    {
      yOffset: 2,
      data: await grass1,
    },
    {
      yOffset: 2,
      data: await grass2,
    },
    {
      yOffset: 2,
      data: await grass3,
    },
    {
      yOffset: 2,
      data: await grass4,
    },
  ];

  sprites.water = [
    {
      yOffset: -3,
      data: await water1,
    },
    {
      yOffset: -3,
      data: await water2,
    },
  ];

  sprites.mountain = [
    {
      yOffset: 14,
      data: await mountain1,
    },
    {
      yOffset: 12,
      data: await mountain2,
    },
    {
      yOffset: 14,
      data: await mountain3,
    },
  ];

  sprites.mountainTop = [
    {
      yOffset: 14,
      data: await mountainTop1,
    },
    {
      yOffset: 12,
      data: await mountainTop2,
    },
    {
      yOffset: 14,
      data: await mountainTop3,
    },
  ];

  sprites.forest = [
    {
      yOffset: 15,
      data: await forest1,
    },
    {
      yOffset: 15,
      data: await forest2,
    },
    {
      yOffset: 15,
      data: await forest3,
    },
    {
      yOffset: 15,
      data: await forest4,
    },
  ];

  sprites.forestTop = [
    {
      yOffset: 15,
      data: await forestTop1,
    },
    {
      yOffset: 15,
      data: await forestTop2,
    },
    {
      yOffset: 15,
      data: await forestTop3,
    },
    {
      yOffset: 15,
      data: await forestTop4,
    },
  ];

  sprites.playerTokens = {
    angel: {
      yOffset: 51,
      data: await angel,
    },
    despoiler: {
      yOffset: 51,
      data: await despoiler,
    },
    sheild: {
      yOffset: 48,
      data: await sheild,
    },
  };
};

export { sprites };

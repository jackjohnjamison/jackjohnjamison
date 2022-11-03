import { scene } from ".";

const renderFrame = (delta) => {
  const {
    ctx,
    canvas,
    floorCanvas,
    entityCanvas,
    view,
    effectsMiddle,
    effectsTop,
  } = scene;
  const { translate } = view;

  // ctx.clearRect(-translate.x, -translate.y, canvas.width, canvas.height);
  // ctx.drawImage(floorCanvas, 0, 0);

  effectsMiddle();

  // scene.entities.forEach((entity) => { // // // DO NOT DELETE
  //   entity.update(delta);
  // });

  // ctx.drawImage(entityCanvas, 0, 0);

  effectsTop();
};

const renderStaticFrame = () => {
  const { ctx, canvas, floorCanvas, entityCanvas, view } = scene;
  const { translate } = view;

  ctx.clearRect(-translate.x, -translate.y, canvas.width, canvas.height);
  ctx.drawImage(floorCanvas, 0, 0);
  ctx.drawImage(entityCanvas, 0, 0);
};

export { renderFrame, renderStaticFrame };

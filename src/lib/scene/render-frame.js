import { scene } from ".";

const renderFrame = (delta) => {
  const {
    ctx1,
    ctx2,
    entityCtx,
    ctx4,
    floorCanvas,
    entityCanvas,
    view,
    effectsMiddle,
    effectsTop,
    entities,
    canvas2: { width, height },
  } = scene;
  const { translate } = view;

  ctx2.clearRect(-translate.x, -translate.y, width, height);
  effectsMiddle();

  entities.forEach((entity) => {
    entity.update(delta);
  });

  // entityCtx.clearRect(-translate.x, -translate.y, width, height);
  // entityCtx.drawImage(entityCanvas, 0, 0);

  ctx4.clearRect(-translate.x, -translate.y, width, height);
  effectsTop();
};

const renderStaticFrame = () => {
  const {
    ctx1,
    entityCtx,
    floorCanvas,
    entityCanvas,
    view,
    canvas2: { width, height },
  } = scene;

  const { translate } = view;

  // ctx1.clearRect(-translate.x, -translate.y, width, height);
  // ctx1.drawImage(floorCanvas, 0, 0);

  // entityCtx.clearRect(-translate.x, -translate.y, width, height);
  // entityCtx.drawImage(entityCanvas, 0, 0);
};

export { renderFrame, renderStaticFrame };

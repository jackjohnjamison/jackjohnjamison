import { scene } from ".";

const renderFrame = (delta) => {
  const {
    ctx1,
    floorCanvas,
    entityCanvas,
    view,
    effectsMiddle,
    effectsTop,
    entities,
    canvas1: { width, height },
  } = scene;
  const { translate } = view;

  ctx1.clearRect(-translate.x, -translate.y, width, height);
  ctx1.drawImage(floorCanvas, 0, 0);

  effectsMiddle();

  entities.forEach((entity) => {
    entity.update(delta);
  });

  ctx1.drawImage(entityCanvas, 0, 0);

  effectsTop();
};

const renderStaticFrame = () => {
  const {
    ctx1,
    floorCanvas,
    entityCanvas,
    view,
    canvas1: { width, height },
  } = scene;
  const { translate } = view;

  ctx1.clearRect(-translate.x, -translate.y, width, height);
  ctx1.drawImage(floorCanvas, 0, 0);
  ctx1.drawImage(entityCanvas, 0, 0);
};

export { renderFrame, renderStaticFrame };

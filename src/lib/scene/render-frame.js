import { scene } from ".";

const renderFrame = (delta) => {
  const {
    ctx2,
    ctx4,
    view,
    effectsMiddle,
    effectsTop,
    entities,
    canvas2: { width, height },
  } = scene;
  const { translate } = view;

  entities.forEach((entity) => {
    entity.update(delta);
  });

  ctx2.clearRect(-translate.x, -translate.y, width, height);
  effectsMiddle();

  ctx4.clearRect(-translate.x, -translate.y, width, height);
  effectsTop();
};

export { renderFrame };

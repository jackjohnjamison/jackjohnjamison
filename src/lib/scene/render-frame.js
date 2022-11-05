import { scene } from ".";

const renderFrame = (delta) => {
  const {
    ctxMid,
    ctxTop,
    view,
    effectsMiddle,
    effectsTop,
    entities,
    canvasMid: { width, height },
  } = scene;
  const { translate } = view;

  entities.forEach((entity) => {
    entity.update(delta);
  });

  ctxMid.clearRect(-translate.x, -translate.y, width, height);
  effectsMiddle();

  ctxTop.clearRect(-translate.x, -translate.y, width, height);
  effectsTop();
};

export { renderFrame };

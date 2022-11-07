import { scene } from ".";

const renderFrame = (delta) => {
  const { entities } = scene;

  entities.forEach((entity) => {
    entity.update(delta);
  });
};

export { renderFrame };

import { scene } from "./scene";
import { sprites } from "./sprites";

const start = async () => {
  await sprites.load();
  scene.start("riddle");
  window.dump = () => console.log(scene);
};

start();

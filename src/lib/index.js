import { scene } from "./scene";
import { sprites } from "./sprites";

const start = async () => {
  await sprites.load();
  scene.start("vista");
  window.dump = () => console.log(scene);
};

start();

console.log("AM I DEV???", import.meta.env.DEV);

import { scene } from "./scene";
import { Root } from "../jsx/root";

root.replaceWith(Root());
scene.start("vista");
window.dump = () => console.log(scene);

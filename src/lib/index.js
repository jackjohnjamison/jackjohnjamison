console.log("AM I PROD???", import.meta.env.PROD);

import { scene } from "./scene";
import { Root } from "../jsx/root";

root.replaceWith(Root());
scene.start("vista");
window.dump = () => console.log(scene);

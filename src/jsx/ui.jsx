// This import is needed for JSX
import { h, Fragment } from "start-dom-jsx";
import { scene } from "../lib/scene"
import { TilePainter } from "./tile-painter"

const UI = () => {
  return (
    <div id="ui">
      { scene.mode === "editMode" ? (
        <TilePainter />
      ) : (
        null
      )}
    </div>
  );
};

const resetUI = () => {
  scene.shadowUI.getElementById("ui").replaceWith(UI())
}

export { resetUI };

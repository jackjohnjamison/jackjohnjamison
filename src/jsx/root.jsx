// This import is needed for JSX
import { h, Fragment } from "start-dom-jsx";
import { PauseMenu } from "./pause-menu"
import { Toolbar } from "./toolbar";

const Root = () => {
  return (
    <div class="wrapper">
      <Toolbar />
      <div id="canvasRoot">
        <canvas class="layer-canvas" id="floorCanvas" />
        <canvas class="layer-canvas" id="canvasMid" />
        <canvas class="layer-canvas" id="entityCanvas" />
        <canvas class="layer-canvas" id="canvasTop" />
        <div id="uiMount" />
        <PauseMenu />
      </div>
    </div>
  );
};

export { Root };

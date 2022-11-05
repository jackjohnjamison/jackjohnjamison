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
        <canvas class="layer-canvas" id="canvas2" />
        <canvas class="layer-canvas" id="entityCanvas" />
        <canvas class="layer-canvas" id="canvas4" />
        <div id="ui" />
        <PauseMenu />
      </div>
    </div>
  );
};

export { Root };

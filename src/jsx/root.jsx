// This import is needed for JSX
import { h, Fragment } from "start-dom-jsx";
import { PauseMenu } from "./pause-menu"
import { Toolbar } from "./toolbar";

const Root = () => {
  return (
    <div class="wrapper">
      <Toolbar />
      <div id="canvasRoot">
        <canvas id="floorCanvas" />
        <canvas id="midCanvas" />
        <canvas id="entityCanvas" />
        <canvas id="topCanvas" />
        <div id="ui"></div>
        <PauseMenu />
      </div>
    </div>
  );
};

export { Root };

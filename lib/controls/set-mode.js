import { scene } from "../scene";
import { resetUI } from "../../jsx/ui";
import { renderLoop } from "../scene";
import { keyCheck, resetKeys, keyEventFunctions } from "./key-check";
import { editMode } from "./modes/edit";
import { playMode } from "./modes/play";

const pauseToggle = () => {
  const { paused, stop, restart } = renderLoop;

  if (paused) {
    restart();
    document.body.classList.remove("paused");
  } else {
    stop();
    document.body.classList.add("paused");
  }
};

const toggleFullScreen = () => {
  if (!document.fullscreenElement) {
    canvasRoot.requestFullscreen();
  } else if (document.exitFullscreen) {
    document.exitFullscreen();
  }
};

keyEventFunctions.keyDown = (keyCode) => {
  switch (keyCode) {
    case "Space":
      pauseToggle();
      break;

    case "Enter":
      if (keyCheck("ControlLeft")) {
        toggleFullScreen();
      }
      break;

    default:
      return;
  }
};

document.addEventListener("visibilitychange", () => {
  const { stop } = renderLoop;

  if (document.visibilityState === "hidden") {
    stop();
    document.body.classList.add("paused");
  } else if (document.visibilityState === "visible") {
    // Prevents bug where keys are stuck down after tabbing away.
    resetKeys();
  }
});

const modes = {
  editMode,
  playMode,
};

const setMode = (mode) => {
  modes[scene.mode].unset();
  scene.mode = mode;
  resetUI();
  modes[mode].set();
};

export { setMode, pauseToggle };

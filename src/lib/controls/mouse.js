import { scene } from "../scene";
import { tileHalfHeight, tileHalfWidth } from "../constants";

const mouse = {
  x: 0,
  y: 0,
  buttonCode: 0,
  onMouseUp: null,
  onMouseMove: null,
  isDragged: false,
  dragStart: { x: 0, y: 0 },
  drag: { x: 0, y: 0 },
};

const mouseTracker = (element) => {
  // Disables right click on the targeted element
  element.addEventListener("contextmenu", (e) => e.preventDefault());

  element.onmousemove = (e) => {
    const { translate } = scene.view;

    const { left, top } = e.target.getBoundingClientRect();

    mouse.x = e.clientX - left - translate.x;
    mouse.y = e.clientY - top - translate.y;

    if (mouse.buttonCode === 1) {
      mouse.isDragged = true;

      const mouseDragX = mouse.dragStart.x - mouse.x - translate.x;
      const mouseDragY = mouse.dragStart.y - mouse.y - translate.y;

      // This limits drag speed to half the dimension of a tile on that axis
      mouse.drag.x = Math.max(
        mouse.drag.x - tileHalfWidth,
        Math.min(mouseDragX, mouse.drag.x + tileHalfWidth)
      );
      mouse.drag.y = Math.max(
        mouse.drag.y - tileHalfWidth,
        Math.min(mouseDragY, mouse.drag.y + tileHalfHeight)
      );

      mouse.drag.y = mouse.dragStart.y - mouse.y - translate.y;
    }

    if (mouse.onMouseMove) {
      mouse.onMouseMove();
    }
  };

  element.onmousedown = (e) => {
    e.preventDefault();
    mouse.buttonCode = e.which;

    mouse.dragStart.x = mouse.x;
    mouse.dragStart.y = mouse.y;
  };

  document.onmouseup = () => {
    if (mouse.onMouseUp) {
      mouse.onMouseUp();
    }

    mouse.isDragged = false;
    mouse.buttonCode = 0;
  };

  element.onmouseleave = () => {
    mouse.isDragged = false;
    mouse.buttonCode = 0;
  };

  return mouse;
};

export { mouseTracker };

import { scene } from "../scene";
import { entity } from "./entity";
import { sprites } from "../sprites";
import { pathfinding } from "./movement/pathfinding";
import { keyboardMovement } from "./movement/keyboard-movement";
import { pathMovementSpeed } from "../constants";

class unit extends entity {
  constructor() {
    super(sprites.playerTokens.angel);
    this.path = [];

    const pathFinder = pathfinding(this, pathMovementSpeed);

    const movement = {
      editMode: pathFinder.move,
      playMode: keyboardMovement(this),
    };

    this.update = (delta) => {
      movement[scene.mode](delta);
      this.redraw();
    };

    this.requestMove = pathFinder.requestMove;
    this.unsetPath = pathFinder.unsetPath;
  }
}

export { unit };

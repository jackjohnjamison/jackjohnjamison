import { scene } from "../scene";
import { entity } from "./entity";
import { sprites } from "../sprites";
import { pathfinding } from "./movement/pathfinding";
import { keyboardMovement } from "./movement/keyboard";
import { pathMovementSpeed } from "../constants";

class unit extends entity {
  constructor() {
    super(sprites.playerTokens.angel);
    this.path = [];

    const pathFinder = pathfinding(this, pathMovementSpeed);
    const keyboardMove = keyboardMovement(this, 0.15);

    const movement = {
      editMode: pathFinder.move,
      playMode: keyboardMove,
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

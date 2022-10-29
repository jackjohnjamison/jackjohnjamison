import { scene } from "../scene";
import { entity } from "./entity";
import { sprites } from "../sprites";
import { pathfinding } from "./movement/pathfinding";
import { pathMovementSpeed } from "../constants";

class unit extends entity {
  constructor() {
    super({
      sprite: sprites.playerTokens.angel,
      haloColor: "lime",
    });
    this.path = [];

    const pathFinder = pathfinding(this, pathMovementSpeed);

    const movement = {
      // Duplicated path finding move while contructing a new option
      editMode: pathFinder.move,
      playMode: pathFinder.move,
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

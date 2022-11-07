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

    this.update = (delta) => {
      pathFinder.move(delta);
      this.redraw();
    };

    this.requestMove = pathFinder.requestMove;
    this.unsetPath = pathFinder.unsetPath;
  }
}

export { unit };

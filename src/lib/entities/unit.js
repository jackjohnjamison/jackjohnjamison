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

    const movementStep = () => {
      scene.redrawEffects = true;
    };

    const pathFinder = pathfinding(this, pathMovementSpeed, movementStep);

    this.update = (delta) => {
      pathFinder.move(delta);
      this.redraw();
    };

    this.requestMove = pathFinder.requestMove;
    this.unsetPath = pathFinder.unsetPath;
  }
}

export { unit };

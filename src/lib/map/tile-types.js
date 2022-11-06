const tileTypes = {
  mountain: {
    displayName: "Mountains",
    walkable: false,
    floor: "mountain",
    feature: "mountainTop",
    type: "linked",
  },

  forest: {
    displayName: "Forest",
    walkable: true,
    floor: "forest",
    feature: "forestTop",
    type: "linked",
  },

  terracotta: {
    displayName: "Terracotta Floor",
    walkable: true,
    floor: "terracotta",
    type: "floor",
  },

  grass: {
    displayName: "Grass",
    walkable: true,
    floor: "grass",
    type: "floor",
  },

  cube: {
    displayName: "Cube",
    walkable: false,
    feature: "cube",
    floor: "terracotta",
    type: "feature",
  },

  water: {
    displayName: "Water",
    walkable: false,
    floor: "water",
    type: "obstacle",
  },

  void: {
    displayName: "Void",
    walkable: false,
    type: "void",
  },
};

export { tileTypes };

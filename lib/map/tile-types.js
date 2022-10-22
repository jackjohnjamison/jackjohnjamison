const tileTypes = {
  mountain: {
    displayName: "Mountains",
    walkable: 1,
    floor: "mountain",
    feature: "mountainTop",
    type: "linked",
  },

  forest: {
    displayName: "Forest",
    walkable: 0,
    floor: "forest",
    feature: "forestTop",
    type: "linked",
  },

  terracotta: {
    displayName: "Terracotta Floor",
    walkable: 0,
    floor: "terracotta",
    type: "floor",
  },

  grass: {
    displayName: "Grass",
    walkable: 0,
    floor: "grass",
    type: "floor",
  },

  cube: {
    displayName: "Cube",
    walkable: 1,
    feature: "cube",
    floor: "terracotta",
    type: "feature",
  },

  water: {
    displayName: "Water",
    walkable: 1,
    floor: "water",
    type: "obstacle",
  },

  void: {
    displayName: "Void",
    walkable: 1,
    type: "void",
  },
};

export { tileTypes };

import { scene } from "../scene";
import { tileTypes } from ".";
import { sprites } from "../sprites";

const getVariant = (set) => {
  return Math.floor(Math.random() * sprites[set].length);
};

const createTileMapFromParams = ({ xTiles, yTiles }) => {
  const tileMap = {
    tiles: [],
    walkableTileMatrix: [],
    xTiles,
    yTiles,
  };

  for (let x = 0; x < xTiles; x++) {
    tileMap.tiles[x] = [];
    tileMap.walkableTileMatrix[x] = [];

    for (let y = 0; y < yTiles; y++) {
      tileMap.tiles[x][y] = {};
    }
  }

  for (let x = 0; x < xTiles; x++) {
    for (let y = 0; y < yTiles; y++) {
      setTile({ x, y }, tileMap, "grass");
    }
  }

  return tileMap;
};

const setTile = (tileIndex, tileMap, set, colors, variant = null) => {
  const { floor, feature, walkable, type } = tileTypes[set];
  const { x, y } = tileIndex;

  const tile = tileMap.tiles[x][y];

  switch (type) {
    case "void":
      tile.floor = null;
      tile.feature = null;
      break;

    case "obstacle":
    case "floor":
      tile.floor = {
        set: floor,
        variant: variant || getVariant(floor),
        color: colors?.[type] || 0,
      };
      tile.feature = null;
      break;

    case "linked":
      const linkedVariant = variant || getVariant(floor);
      tile.floor = {
        set: floor,
        variant: linkedVariant,
        color: colors?.floor || 0,
      };
      tile.feature = {
        set: feature,
        variant: linkedVariant,
        color: colors?.feature || 0,
      };
      break;

    case "feature":
      tile.feature = {
        set: feature,
        variant: variant || getVariant(feature),
        color: colors?.feature || 0,
      };
      if (
        tile.type === "void" ||
        tile.type === "linked" ||
        tile.type === "obstacle"
      ) {
        tile.floor = {
          set: floor,
          variant: getVariant(floor),
          color: colors?.feature,
        };
      }
      break;

    default:
    // Do nothing
  }

  tile.type = type;

  tile.walkable = walkable;
  tileMap.walkableTileMatrix[x][y] = walkable;
};

const saveTileMaptoJSON = () => {
  const { tileMap, entities } = scene;

  tileMap.entityList = [];
  entities.forEach((entity) => {
    const {
      constructor: { name },
      tileIndex,
    } = entity;

    if (name === "unit") {
      tileMap.unitStart = tileIndex;
    } else {
      tileMap.entityList.push({
        name,
        tileIndex,
      });
    }
  });

  return (
    "data:text/json;charset=utf-8," +
    encodeURIComponent(JSON.stringify(tileMap))
  );
};

const loadMapFromImport = async (map) => {
  const mapJSON = JSON.stringify(await import(`../../maps/${map}.json`));
  return loadTileMapFromJSON(mapJSON);
};

const loadTileMapFromJSON = (json) => {
  return JSON.parse(json);
};

export {
  createTileMapFromParams,
  loadMapFromImport,
  loadTileMapFromJSON,
  saveTileMaptoJSON,
  setTile,
};

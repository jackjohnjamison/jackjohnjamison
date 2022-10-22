// Scene constants
export const //
  // Tile dimensions
  tileWidth = 64, // pixels
  tileHeight = 32, // pixels
  tileDimensionRatio = tileWidth / tileHeight,
  mapSize = 32,
  //
  // Thickness of padding at canvas bottomd
  paddingBottom = 32,
  paddingTop = 128,
  //
  // Colours
  hoveredTileColor = "rgba(255,255,255,0.1)",
  hoveredTileOutlineColor = "rgba(255,255,0,0.6)",
  pathTileOutlineColor = "yellow",
  pathTileUnderOutlineColor = "rgba(255,0,0,0.2)",
  defaultTileColor = "#002112",
  //
  // Physics variables
  friction = 0.8,
  collisionDistance = 28,
  cameraAcceleration = 0.12,
  unitAcceleration = 0.04,
  pathMovementSpeed = 0.18,
  npcPatrolSpeed = 0.08;
// This import is needed for JSX
import { h, Fragment } from "start-dom-jsx";
import { tileTypes } from "../lib/map/"
import { sprites } from "../lib/sprites"

/* 
* This is all a bit of a mess and could probably use another look
* for improvments at some point.
*/

// Styling pixel widths
const paddingSides = 5
const paddingBottom = 6
const frame = 2
const offset = 4

const spriteHue = {}
const spriteSize = {}
let [ selectedTileSet ] = Object.keys(tileTypes)
let selectedSetType = tileTypes[selectedTileSet].type
let selectedTileSetSprites
console.log(selectedTileSetSprites);
let tileSets = []

const resetBrushes = (e) => {
  selectedTileSet = e?.target.value || selectedTileSet;
  selectedSetType = tileTypes[selectedTileSet].type
  selectedTileSetSprites = sprites[selectedTileSet]
  spriteDisplay.replaceWith(SpriteDisplay());

  if(selectedSetType !== "void") {
    hueRotate()
  }
}

const SpriteDisplay = () => {
  switch (selectedSetType) {
    case "void":
      return (
        <div id="spriteDisplay" class="spriteDisplay--void">
          <div class="brush">
            <div class="void-brush">X</div>
            <span>Delete tiles</span>
          </div>
        </div>
      )

    case "linked":
      const { floor, feature } = tileTypes[ selectedTileSet ]
      tileSets = { floor, feature }
      break;

    default:
      tileSets = { [selectedSetType]:selectedTileSet }
      break;
  }

  return (
    <div id="spriteDisplay">
      <SpriteBrushes />
    </div>
  )
}

const findSpriteSize = () => {
  return spriteSize[selectedTileSet] = {
    width: Math.max(...selectedTileSetSprites.map((sprite) => sprite.data.width)) + paddingSides,
    height: Math.max(...selectedTileSetSprites.map((sprite) => sprite.data.height)) + paddingBottom,
  }
}

const hueRotate = () => {
  const inputs = tilePainter.elements;

  Object.keys(tileSets).forEach((type) => {
    const tileSet = tileSets[type]
    const slider = inputs[ `${ type }Hue` ]
    const display = document.getElementById(`${ type }HueRotaion`)
    const hue = slider.value;
    
    display.innerText = spriteHue[tileSet] = hue
  
    sprites[tileSet].forEach((n, i) => {
      // Finding the elements by id could likely be improved
      const canvas = document.getElementById(`tileCanv${i}`)
      const ctx = canvas.getContext("2d")
      ctx.filter = `hue-rotate(${hue}deg)`;
      const image = sprites[tileSet][i].data 
      ctx.drawImage(image, offset, offset);
    })
  })
}

const HueSlider = (props) => {
  const { tileSet, tiles, label, type } = props

  return (
    <div>
      <div>
        <label for={ `${ type }Hue` }>{label}: </label>
        <span id={ `${ type }HueRotaion`}>0</span>
      </div>
      <input
        id={ `${ type }Hue`}
        class="hue-slider"
        type="range"
        min="-180"
        max="180"
        step="1"
        tile-type={ type }
        value={ spriteHue[tileSet] || 0 }
        onInput={() => { hueRotate(tiles || [ tileSet ]) }}
      />
    </div>
  )
}

const SpriteOption = (props) => {
  const { width, height, index } = props

  return (
    <div class="brush">
      <canvas
        id={`tileCanv${ index }`}
        width={ width + frame }
        height={ height + frame } 
      />
      <input
        type="radio"
        value={ index }
        name="tileVariant"
        style={{
          width: `${ width }px`,
          height: `${ height }px`
        }}
      />
    </div>
  )
}

const SpriteBrushes = () => {
  const { width, height } = spriteSize[ selectedTileSet ] || findSpriteSize()
  const tileSetArray = Object.keys(tileSets)

  return (
    <div>
      <div class="sprite-brushes">
        <div class="brush">
          <div
            class="random-tile-brush"
            style={{
              width: `${ width + frame }px`,
              height: `${ height + frame }px`
            }}
          ><div>?</div></div>
          <input
            checked
            type="radio"
            value="random"
            name="tileVariant"
            style={{
              width: `${ width }px`,
              height: `${ height }px`
            }}
          />
        </div>
        { selectedTileSetSprites.map((n, i) => (
          <SpriteOption { ...{
            width,
            height,
            index: i,
        }}/>
        ))}
      </div>
      { tileSetArray.map((type) => (
        <HueSlider { ...{
          tileSet: tileSets[type],
          label: tileSetArray.length > 1 ? type + " Hue" : "Hue",
          tiles: tileSets,
          type,
        }}/>
      ))}
    </div>
  )
}

const TilePainter = () => {
  selectedTileSetSprites = sprites[selectedTileSet]

  return (
    <form id="tilePainter">
      <select id="terrainType" name="terrainType" onChange={ resetBrushes }>
        { Object.keys(tileTypes).map((type) => (
          <option selected={ selectedTileSet === type } value={type}>{ tileTypes[type].displayName }</option>
        ))}
      </select>
      <SpriteDisplay />
    </form>
  );
};

const getBrushSelection = () => {
  const inputs = tilePainter.elements;

  const colors = {}
  Object.keys(tileSets).forEach((type) => {
    const hueSlider = inputs[`${ type }Hue`]
    colors[type] = hueSlider?.value || null
  })

  let variant = null
  const inputVariant = inputs.tileVariant?.value
  if(inputVariant !== "random") {
    variant = inputVariant || null
  }

  return {
    set: terrainType.value,
    type: selectedSetType,
    variant,
    colors,
  }
}

export { TilePainter, resetBrushes, getBrushSelection };

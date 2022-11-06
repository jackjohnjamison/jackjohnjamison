To run locally for the first time enter in the console:
cd src
npm i
npm run dev

After this you can just use:
npm run dev

Build changes with:
npm run build

Website
https://jackjohnjamison.github.io/tiles/

*** TODO ***
- Ongoing refactoring the mess
- To class or not to class? Get advice so you can ignore it
- Should the entity map use arrays and not objects at tile level?
- Stop redrawing when objects are not in motion or the camera is not being panned
- Undo button
- Create entity interface
- Actually design a game
- Learn markdown

*** Referances ***
Pathfinding
https://www.npmjs.com/package/pathfinding

Isometric game dev stuff
https://hub.packtpub.com/going-isometric/

Change colour saturation
https://stackoverflow.com/questions/40353049/how-can-i-adjust-the-huse-saturation-and-lightness-of-in-image-in-html5-canvas

https://developer.mozilla.org/en-US/docs/Web/API/CanvasRenderingContext2D/globalCompositeOperation

Game development guide
https://spicyyoghurt.com/tutorials/html5-javascript-game-development/images-and-sprite-animations

JSX
https://github.com/davidmold/vite-jsx
https://davidmold.medium.com/use-vite-for-jsx-without-react-e59aed9460f5

Offscreen canvas!?
https://developer.mozilla.org/en-US/docs/Web/API/OffscreenCanvas

Canvas guides
https://developer.chrome.com/blog/canvas2d/
https://hacks.mozilla.org/2013/05/optimizing-your-javascript-game-for-firefox-os/

Move the canvas to a webworker?
https://developer.chrome.com/blog/offscreen-canvas/

Benchmark
https://jsbench.me/

*** Known bugs and issues ***
- Prevent the effect layers refreshing when they don't need to change.
- Path is hidden until moust moves over another tile after player finished walking a path.
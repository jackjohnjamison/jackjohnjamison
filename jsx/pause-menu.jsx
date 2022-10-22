import { h, Fragment } from "start-dom-jsx";
import { pauseToggle } from "../lib/controls/set-mode";

const PauseMenu = () => {
  return (
    <div>
      <div id="pauseMenu">
        <div class="pause-menu-items">
          <p>Paused</p>
          <ul>
            <li><button onclick={pauseToggle}>Resume</button></li>
            <li><button id="loadButton">Load</button></li>
            <li>
              <button class="save" id="saveButton">Save</button>
              <input type="text" id="saveName" value="tile-map" />
            </li>
          </ul>
        </div>
      </div>
    </div> 
  );
};

export { PauseMenu }
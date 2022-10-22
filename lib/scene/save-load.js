import { reloadScene } from "./reload-scene";
import { loadTileMapFromJSON, saveTileMaptoJSON } from "../map";

const initSaveLoad = () => {
  // Sets save function
  saveButton.onclick = () => {
    const mapData = saveTileMaptoJSON();
    const downloadNode = document.createElement("a");
    downloadNode.setAttribute("href", mapData);
    downloadNode.setAttribute("download", saveName.value + ".json");
    saveButton.after(downloadNode);
    downloadNode.click();
    downloadNode.remove();
  };

  // Sets load function
  loadButton.onclick = () => {
    const loadNode = document.createElement("input");
    loadNode.type = "file";

    loadButton.after(loadNode);
    loadNode.onchange = () => {
      const reader = new FileReader();

      reader.onload = (e) => {
        const tileMap = loadTileMapFromJSON(e.target.result);
        reloadScene(tileMap);
      };

      reader.readAsText(loadNode.files[0]);
    };

    loadNode.click();
    loadNode.remove();
  };
};

export { initSaveLoad };

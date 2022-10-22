// This import is needed for JSX
import { h, Fragment } from "start-dom-jsx";

const Toolbar = () => {
  return (
    <div class="toolbar">
      <form id="mode" name="mode" class="margin-right-10">
        <input
          type="radio"
          id="playRadio"
          value="playMode"
          class="margin-right-10"
          name="mode"
          checked
        />
        <label for="playRadio">Play Mode</label>
        <input
          type="radio"
          id="editModeRadio"
          value="editMode"
          class="margin-left-10 margin-right-10"
          name="mode"
        />
        <label for="editModeRadio">Edit Mode</label>
      </form>
    </div>
  );
};

export { Toolbar };


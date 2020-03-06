import TRAINING from "../mode/training.mode";
import VERSUS from "../mode/versus.mode";
import SELECTING_COLOR from "../sideState/selectingColor.state";
import SELECTING_AI_LEVEL from "../sideState/selectingAILevel.state";
import SELECTED from "../sideState/selected.state";
import VERSUS_SELECTING_STAGE from "../state/versusSelectingStage.state";

export default function selectCharacterTwoColor(data, action) {
  if (data.rightSideState !== SELECTING_COLOR) {
    throw new Error(`Unable to select character two color in state: ${data.state}`);
  }

  const newData = {
    ...data,
    characterTwoColorIndex: action.colorIndex
  };

  if (newData.mode === TRAINING) {
    newData.rightSideState = SELECTING_AI_LEVEL;
    return newData;
  }

  if (newData.mode === VERSUS) {
    newData.rightSideState = SELECTED;
    if (newData.leftSideState === SELECTED) {
      newData.state = VERSUS_SELECTING_STAGE;
    }
    return newData;
  }

  throw new Error(`Unable to select character two color in state: ${data.state}`);
}

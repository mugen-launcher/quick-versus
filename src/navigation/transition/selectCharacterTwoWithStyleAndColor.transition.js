import SELECTING_CHARACTER from "../sideState/selectingCharacter.state";
import TRAINING from "../mode/training.mode";
import VERSUS from "../mode/versus.mode";
import SELECTED from "../sideState/selected.state";
import VERSUS_SELECTING_STAGE from "../state/versusSelectingStage.state";
import SELECTING_AI_LEVEL from "../sideState/selectingAILevel.state";

export default function selectCharacterTwoeWithStyleAndColor(data, action) {
  if (data.rightSideState !== SELECTING_CHARACTER) {
    throw new Error(`Unable to select character two in state: ${data.state}`);
  }

  const newData = {
    ...data,
    characterTwo: action.character,
    characterTwoCategoryIndex: action.categoryIndex,
    characterTwoIndex: action.characterIndex,
    characterTwoColorIndex: 1
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

  throw new Error(`Unable to select character two in state: ${data.state}`);
}

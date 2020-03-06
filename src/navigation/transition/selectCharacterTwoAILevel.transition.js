import SELECTING_AI_LEVEL from "../sideState/selectingAILevel.state";
import SELECTED from "../sideState/selected.state";
import TRAINING_SELECTING_STAGE from "../state/trainingSelectingStage.state";

export default function selectCharacterTwoAILevel(data, action) {
  if (data.rightSideState !== SELECTING_AI_LEVEL) {
    throw new Error(`Unable to select character two AI level in state: ${data.state}`);
  }

  return {
    ...data,
    characterTwoAILevel: action.level,
    state: TRAINING_SELECTING_STAGE,
    rightSideState: SELECTED
  };
}

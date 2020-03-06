import TRAINING from "./mode/training.mode";
import TRAINING_SELECTING_CHARACTER_ONE from "./state/trainingSelectingCharacterOne.state";
import SELECTING_CHARACTER from "./sideState/selectingCharacter.state";
import EMPTY from "./sideState/empty.state";

export default {
  state: TRAINING_SELECTING_CHARACTER_ONE,
  leftSideState: SELECTING_CHARACTER,
  rightSideState: EMPTY,
  mode: TRAINING
};

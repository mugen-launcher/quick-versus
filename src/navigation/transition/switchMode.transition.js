import TRAINING from "../mode/training.mode";
import VERSUS from "../mode/versus.mode";
import VERSUS_SELECTING_CHARACTERS from "../state/versusSelectingCharacters.state";
import TRAINING_SELECTING_CHARACTER_ONE from "../state/trainingSelectingCharacterOne.state";
import TRAINING_SELECTING_CHARACTER_TWO from "../state/trainingSelectingCharacterTwo.state";
import SELECTING_CHARACTER from "../sideState/selectingCharacter.state";
import EMPTY from "../sideState/empty.state";
import SELECTED from "../sideState/selected.state";

export default function switchMode(data) {
  const newData = { ...data };

  if (
    data.state !== VERSUS_SELECTING_CHARACTERS &&
    data.state !== TRAINING_SELECTING_CHARACTER_ONE &&
    data.state !== TRAINING_SELECTING_CHARACTER_TWO
  ) {
    throw new Error(`Unable to switch mode in state: ${data.state}`);
  }

  if (data.mode === TRAINING) {
    newData.mode = VERSUS;
    newData.state = VERSUS_SELECTING_CHARACTERS;
    newData.rightSideState = SELECTING_CHARACTER;
    return newData;
  }

  if (data.mode === VERSUS) {
    newData.mode = TRAINING;

    if (newData.leftSideState === SELECTED) {
      newData.state = TRAINING_SELECTING_CHARACTER_TWO;
    } else {
      newData.state = TRAINING_SELECTING_CHARACTER_ONE;
      newData.rightSideState = EMPTY;
    }
    return newData;
  }

  throw new Error(`Unable to switch mode in state: ${data.state}`);
}

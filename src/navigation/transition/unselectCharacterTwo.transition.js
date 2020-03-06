import TRAINING from "../mode/training.mode";
import VERSUS from "../mode/versus.mode";
import TRAINING_SELECTING_CHARACTER_TWO from "../state/trainingSelectingCharacterTwo.state";
import SELECTING_CHARACTER from "../sideState/selectingCharacter.state";
import VERSUS_SELECTING_CHARACTERS from "../state/versusSelectingCharacters.state";

export default function unselectCharacterTwo(data) {
  const newData = { ...data, rightSideState: SELECTING_CHARACTER };
  if (newData.characterTwo) {
    delete newData.characterTwo;
  }

  if (data.mode === TRAINING) {
    newData.state = TRAINING_SELECTING_CHARACTER_TWO;
    return newData;
  }

  if (data.mode === VERSUS) {
    newData.state = VERSUS_SELECTING_CHARACTERS;
    return newData;
  }

  throw new Error(`Unable to unselect character two in state: ${data.state}`);
}

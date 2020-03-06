import TRAINING from "../mode/training.mode";
import VERSUS from "../mode/versus.mode";
import TRAINING_SELECTING_CHARACTER_ONE from "../state/trainingSelectingCharacterOne.state";
import SELECTING_CHARACTER from "../sideState/selectingCharacter.state";
import VERSUS_SELECTING_CHARACTERS from "../state/versusSelectingCharacters.state";

export default function unselectCharacterOne(data) {
  const newData = { ...data, leftSideState: SELECTING_CHARACTER };
  if (newData.characterOne) {
    delete newData.characterOne;
  }

  if (data.mode === TRAINING) {
    newData.state = TRAINING_SELECTING_CHARACTER_ONE;
    return newData;
  }

  if (data.mode === VERSUS) {
    newData.state = VERSUS_SELECTING_CHARACTERS;
    return newData;
  }

  throw new Error(`Unable to unselect character one in state: ${data.state}`);
}

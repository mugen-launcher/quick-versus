import TRAINING_FIGHTING from "../state/trainingFighting.state";
import VERSUS_FIGHTING from "../state/versusFighting.state";
import TRAINING_SELECTING_CHARACTER_ONE from "../state/trainingSelectingCharacterOne.state";
import VERSUS_SELECTING_CHARACTERS from "../state/versusSelectingCharacters.state";
import SELECTING_CHARACTER from "../sideState/selectingCharacter.state";
import EMPTY from "../sideState/empty.state";

export default function endFight(data) {
  const newData = { ...data };

  if (data.state === TRAINING_FIGHTING) {
    newData.state = TRAINING_SELECTING_CHARACTER_ONE;
    newData.leftSideState = SELECTING_CHARACTER;
    newData.rightSideState = EMPTY;
    return newData;
  }

  if (data.state === VERSUS_FIGHTING) {
    newData.state = VERSUS_SELECTING_CHARACTERS;
    newData.leftSideState = SELECTING_CHARACTER;
    newData.rightSideState = SELECTING_CHARACTER;
    return newData;
  }

  throw new Error(`Unable to end fight in state: ${data.state}`);
}

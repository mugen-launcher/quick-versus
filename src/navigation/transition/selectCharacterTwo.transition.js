import SELECTING_CHARACTER from "../sideState/selectingCharacter.state";
import SELECTING_STYLE from "../sideState/selectingStyle.state";
import SELECTING_COLOR from "../sideState/selectingColor.state";

export default function selectCharacterTwo(data, action) {
  if (data.rightSideState !== SELECTING_CHARACTER) {
    throw new Error(`Unable to select character two in state: ${data.state}`);
  }

  const newData = {
    ...data,
    characterTwo: action.character,
    characterTwoCategoryIndex: action.categoryIndex,
    characterTwoIndex: action.characterIndex
  };

  if (Array.isArray(action.character.styles) && action.character.styles.length > 0) {
    newData.rightSideState = SELECTING_STYLE;
  } else {
    newData.rightSideState = SELECTING_COLOR;
  }
  return newData;
}

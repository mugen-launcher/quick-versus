import SELECTING_CHARACTER from "../sideState/selectingCharacter.state";
import SELECTING_STYLE from "../sideState/selectingStyle.state";
import SELECTING_COLOR from "../sideState/selectingColor.state";

export default function selectCharacterOne(data, action) {
  if (data.leftSideState !== SELECTING_CHARACTER) {
    throw new Error(`Unable to select character one in state: ${data.state}`);
  }

  const newData = {
    ...data,
    characterOne: action.character,
    characterOneCategoryIndex: action.categoryIndex,
    characterOneIndex: action.characterIndex
  };

  if (Array.isArray(action.character.styles) && action.character.styles.length > 0) {
    newData.leftSideState = SELECTING_STYLE;
  } else {
    newData.leftSideState = SELECTING_COLOR;
  }
  return newData;
}

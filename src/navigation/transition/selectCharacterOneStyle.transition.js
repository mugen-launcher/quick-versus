import SELECTING_STYLE from "../sideState/selectingStyle.state";
import SELECTING_COLOR from "../sideState/selectingColor.state";

export default function selectCharacterOneStyle(data, action) {
  if (data.leftSideState !== SELECTING_STYLE) {
    throw new Error(`Unable to select character one style in state: ${data.state}`);
  }

  return {
    ...data,
    characterOne: action.character,
    characterOneStyleIndex: action.styleIndex,
    leftSideState: SELECTING_COLOR
  };
}

import SELECTING_STYLE from "../sideState/selectingStyle.state";
import SELECTING_COLOR from "../sideState/selectingColor.state";

export default function selectCharacterTwoStyle(data, action) {
  if (data.rightSideState !== SELECTING_STYLE) {
    throw new Error(`Unable to select character two style in state: ${data.state}`);
  }

  return {
    ...data,
    characterTwo: action.character,
    characterTwoStyleIndex: action.styleIndex,
    rightSideState: SELECTING_COLOR
  };
}

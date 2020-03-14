import { SELECT_CHARACTER_ONE } from "./action/selectCharacterOne.action";
import { SELECT_CHARACTER_ONE_WITH_STYLE_AND_COLOR } from "./action/selectCharacterOneWithSyleAndColor.action";
import { SELECT_CHARACTER_ONE_STYLE } from "./action/selectCharacterOneStyle.action";
import { SELECT_CHARACTER_ONE_COLOR } from "./action/selectCharacterOneColor.action";
import { UNSELECT_CHARACTER_ONE } from "./action/unselectCharacterOne.action";
import { SELECT_CHARACTER_TWO } from "./action/selectCharacterTwo.action";
import { SELECT_CHARACTER_TWO_WITH_STYLE_AND_COLOR } from "./action/selectCharacterTwoWithSyleAndColor.action";
import { SELECT_CHARACTER_TWO_STYLE } from "./action/selectCharacterTwoStyle.action";
import { SELECT_CHARACTER_TWO_COLOR } from "./action/selectCharacterTwoColor.action";
import { SELECT_CHARACTER_TWO_AI_LEVEL } from "./action/selectCharacterTwoAILevel.action";
import { UNSELECT_CHARACTER_TWO } from "./action/unselectCharacterTwo.action";
import { SWITCH_MODE } from "./action/switchMode.action";
import { SELECT_STAGE } from "./action/selectStage.action";
import { END_FIGHT } from "./action/endFight.action";
import selectCharacterOne from "./transition/selectCharacterOne.transition";
import selectCharacterOneWithStyleAndColor from "./transition/selectCharacterOneWithStyleAndColor.transition";
import selectCharacterOneStyle from "./transition/selectCharacterOneStyle.transition";
import selectCharacterOneColor from "./transition/selectCharacterOneColor.transition";
import unselectCharacterOne from "./transition/unselectCharacterOne.transition";
import selectCharacterTwo from "./transition/selectCharacterTwo.transition";
import selectCharacterTwoWithStyleAndColor from "./transition/selectCharacterTwoWithStyleAndColor.transition";
import selectCharacterTwoStyle from "./transition/selectCharacterTwoStyle.transition";
import selectCharacterTwoColor from "./transition/selectCharacterTwoColor.transition";
import selectCharacterTwoAILevel from "./transition/selectCharacterTwoAILevel.transition";
import unselectCharacterTwo from "./transition/unselectCharacterTwo.transition";
import switchMode from "./transition/switchMode.transition";
import selectStage from "./transition/selectStage.transition";
import endFight from "./transition/endFight.transition";

export default function navigationReducer(data, action) {
  switch (action.type) {
    case SWITCH_MODE:
      return switchMode(data);

    case SELECT_CHARACTER_ONE:
      return selectCharacterOne(data, action);

    case SELECT_CHARACTER_ONE_WITH_STYLE_AND_COLOR:
      return selectCharacterOneWithStyleAndColor(data, action);

    case SELECT_CHARACTER_ONE_STYLE:
      return selectCharacterOneStyle(data, action);

    case SELECT_CHARACTER_ONE_COLOR:
      return selectCharacterOneColor(data, action);

    case UNSELECT_CHARACTER_ONE:
      return unselectCharacterOne(data);

    case SELECT_CHARACTER_TWO:
      return selectCharacterTwo(data, action);

    case SELECT_CHARACTER_TWO_WITH_STYLE_AND_COLOR:
      return selectCharacterTwoWithStyleAndColor(data, action);

    case SELECT_CHARACTER_TWO_STYLE:
      return selectCharacterTwoStyle(data, action);

    case SELECT_CHARACTER_TWO_COLOR:
      return selectCharacterTwoColor(data, action);

    case SELECT_CHARACTER_TWO_AI_LEVEL:
      return selectCharacterTwoAILevel(data, action);

    case UNSELECT_CHARACTER_TWO:
      return unselectCharacterTwo(data);

    case SELECT_STAGE:
      return selectStage(data, action);

    case END_FIGHT:
      return endFight(data);

    default:
  }

  return data;
}

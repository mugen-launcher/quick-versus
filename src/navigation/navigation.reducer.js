import { SELECT_CHARACTER_ONE } from "./action/selectCharacterOne.action";
import { UNSELECT_CHARACTER_ONE } from "./action/unselectCharacterOne.action";
import { SELECT_CHARACTER_TWO } from "./action/selectCharacterTwo.action";
import { UNSELECT_CHARACTER_TWO } from "./action/unselectCharacterTwo.action";
import { SWITCH_MODE } from "./action/switchMode.action";
import TRAINING from "./mode/training.mode";
import VERSUS from "./mode/versus.mode";

export default function navigationReducer(state, action) {
  switch (action.type) {
    case SWITCH_MODE: {
      let newMode = state.mode;
      switch (state.mode) {
        case TRAINING:
          newMode = VERSUS;
          break;

        case VERSUS:
          newMode = TRAINING;
          break;
      }
      return { ...state, mode: newMode };
    }

    case SELECT_CHARACTER_ONE: {
      return { ...state, characterOne: action.character };
    }

    case UNSELECT_CHARACTER_ONE: {
      const newState = { ...state };
      if (newState.characterOne) {
        delete newState.characterOne;
      }
      return newState;
    }

    case SELECT_CHARACTER_TWO: {
      return { ...state, characterTwo: action.character };
    }

    case UNSELECT_CHARACTER_TWO: {
      const newState = { ...state };
      if (newState.characterTwo) {
        delete newState.characterTwo;
      }
      return newState;
    }
  }
  return state;
}

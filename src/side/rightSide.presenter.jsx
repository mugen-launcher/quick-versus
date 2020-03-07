import React from "react";
import useNavigation from "../navigation/useData.hook";
import SelectingCharacterByPlayerOne from "./right/selectingCharacterByPlayerOne.presenter";
import SelectingCharacterByPlayerTwo from "./right/selectingCharacterByPlayerTwo.presenter";
import SelectedCharacterCancellableByPlayerOne from "./right/selectedCharacterCancellableByPlayerOne.presenter";
import SelectedCharacterCancellableByPlayerTwo from "./right/selectedCharacterCancellableByPlayerTwo.presenter";
import SelectingCharacterStyleByPlayerOne from "./right/selectingCharacterStyleByPlayerOne.presenter";
import SelectingCharacterStyleByPlayerTwo from "./right/selectingCharacterStyleByPlayerTwo.presenter";
import SelectingCharacterColorByPlayerOne from "./right/selectingCharacterColorByPlayerOne.presenter";
import SelectingCharacterColorByPlayerTwo from "./right/selectingCharacterColorByPlayerTwo.presenter";
import SelectingCharacterAILevelByPlayerOne from "./right/selectingCharacterAILevelByPlayerOne.presenter";
import WaitingComputer from "./right/waitingComputer.view";
import TRAINING_SELECTING_CHARACTER_ONE from "../navigation/state/trainingSelectingCharacterOne.state";
import TRAINING_SELECTING_CHARACTER_TWO from "../navigation/state/trainingSelectingCharacterTwo.state";
import TRAINING_SELECTING_STAGE from "../navigation/state/trainingSelectingStage.state";
import VERSUS_SELECTING_CHARACTERS from "../navigation/state/versusSelectingCharacters.state";
import VERSUS_SELECTING_STAGE from "../navigation/state/versusSelectingStage.state";
import SELECTING_CHARACTER from "../navigation/sideState/selectingCharacter.state";
import SELECTING_STYLE from "../navigation/sideState/selectingStyle.state";
import SELECTING_COLOR from "../navigation/sideState/selectingColor.state";
import SELECTING_AI_LEVEL from "../navigation/sideState/selectingAILevel.state";
import SELECTED from "../navigation/sideState/selected.state";

export default function RightSide() {
  const { state, rightSideState, characterTwo } = useNavigation();

  if (state === TRAINING_SELECTING_CHARACTER_ONE) {
    return <WaitingComputer />;
  }
  if (rightSideState === SELECTING_CHARACTER) {
    if (state === TRAINING_SELECTING_CHARACTER_TWO) {
      return <SelectingCharacterByPlayerOne />;
    }
    return <SelectingCharacterByPlayerTwo />;
  }
  if (rightSideState === SELECTING_STYLE) {
    if (state === TRAINING_SELECTING_CHARACTER_TWO) {
      return <SelectingCharacterStyleByPlayerOne character={characterTwo} />;
    }
    return <SelectingCharacterStyleByPlayerTwo character={characterTwo} />;
  }
  if (rightSideState === SELECTING_COLOR) {
    if (state === TRAINING_SELECTING_CHARACTER_TWO) {
      return <SelectingCharacterColorByPlayerOne character={characterTwo} />;
    }
    return <SelectingCharacterColorByPlayerTwo character={characterTwo} />;
  }
  if (rightSideState === SELECTING_AI_LEVEL) {
    return <SelectingCharacterAILevelByPlayerOne character={characterTwo} />;
  }
  if (state === TRAINING_SELECTING_STAGE) {
    return <SelectedCharacterCancellableByPlayerOne character={characterTwo} />;
  }
  if (state === VERSUS_SELECTING_CHARACTERS && rightSideState === SELECTED) {
    return <SelectedCharacterCancellableByPlayerTwo character={characterTwo} />;
  }
  if (state === VERSUS_SELECTING_STAGE) {
    return <SelectedCharacterCancellableByPlayerTwo character={characterTwo} />;
  }

  return null;
}

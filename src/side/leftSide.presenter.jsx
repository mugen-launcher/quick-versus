import React, { useEffect } from "react";
import useNavigation from "../navigation/useData.hook";
import SelectingCharacterByPlayerOne from "./left/selectingCharacterByPlayerOne.presenter";
import SelectingCharacterColorByPlayerOne from "./left/selectingCharacterColorByPlayerOne.presenter";
import SelectedCharacterCancellableByPlayerOne from "./left/selectedCharacterCancellableByPlayerOne.presenter";
import SelectedCharacter from "./left/selectedCharacter.view";
import TRAINING_SELECTING_CHARACTER_TWO from "../navigation/state/trainingSelectingCharacterTwo.state";
import TRAINING_SELECTING_STAGE from "../navigation/state/trainingSelectingStage.state";
import VERSUS_SELECTING_STAGE from "../navigation/state/versusSelectingStage.state";
import SELECTING_CHARACTER from "../navigation/sideState/selectingCharacter.state";
import SELECTING_STYLE from "../navigation/sideState/selectingStyle.state";
import SELECTING_COLOR from "../navigation/sideState/selectingColor.state";
import SELECTED from "../navigation/sideState/selected.state";

export default function LeftSide() {
  const { state, leftSideState, characterOne } = useNavigation();

  if (leftSideState === SELECTING_CHARACTER) {
    return <SelectingCharacterByPlayerOne />;
  } else if (leftSideState === SELECTING_STYLE) {
    return <p>selecting style</p>;
  } else if (leftSideState === SELECTING_COLOR) {
    return <SelectingCharacterColorByPlayerOne character={characterOne} />;
  } else if (leftSideState === SELECTED && state === TRAINING_SELECTING_CHARACTER_TWO) {
    return <SelectedCharacterCancellableByPlayerOne character={characterOne} />;
  } else if (state === TRAINING_SELECTING_STAGE || state === VERSUS_SELECTING_STAGE) {
    return <SelectedCharacter character={characterOne} />;
  }

  return null;
}

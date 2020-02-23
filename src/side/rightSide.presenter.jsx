import React, { useEffect } from "react";
import useNavigation from "../navigation/useData.hook";
import SelectingCharacterByPlayerOne from "./right/selectingCharacterByPlayerOne.presenter";
import SelectingCharacterByPlayerTwo from "./right/selectingCharacterByPlayerTwo.presenter";
import SelectedCharacterCancellableByPlayerOne from "./right/selectedCharacterCancellableByPlayerOne.presenter";
import SelectedCharacterCancellableByPlayerTwo from "./right/selectedCharacterCancellableByPlayerTwo.presenter";
import SelectingCharacterAILevelByPlayerOne from "./right/selectingCharacterAILevelByPlayerOne.presenter";
import WaitingComputer from "./right/waitingComputer.view";
import TRAINING_SELECTING_CHARACTER_ONE from "../navigation/state/trainingSelectingCharacterOne.state";
import TRAINING_SELECTING_CHARACTER_TWO from "../navigation/state/trainingSelectingCharacterTwo.state";
import TRAINING_SELECTING_CHARACTER_TWO_AI_LEVEL from "../navigation/state/trainingSelectingCharacterTwoAILevel.state";
import TRAINING_SELECTING_STAGE from "../navigation/state/trainingSelectingStage.state";
import TRAINING_FIGHTING from "../navigation/state/trainingFighting.state";
import VERSUS_SELECTING_CHARACTERS from "../navigation/state/versusSelectingCharacters.state";
import VERSUS_SELECTING_CHARACTER_ONE from "../navigation/state/versusSelectingCharacterOne.state";
import VERSUS_SELECTING_CHARACTER_TWO from "../navigation/state/versusSelectingCharacterTwo.state";
import VERSUS_SELECTING_STAGE from "../navigation/state/versusSelectingStage.state";
import VERSUS_FIGHTING from "../navigation/state/versusFighting.state";

export default function RightSide() {
  const navigation = useNavigation();

  switch (navigation.state) {
    case TRAINING_SELECTING_CHARACTER_ONE:
      return <WaitingComputer />;
    case TRAINING_SELECTING_CHARACTER_TWO:
      return <SelectingCharacterByPlayerOne />;
    case VERSUS_SELECTING_CHARACTERS:
    case VERSUS_SELECTING_CHARACTER_TWO:
      return <SelectingCharacterByPlayerTwo />;
    case TRAINING_SELECTING_CHARACTER_TWO_AI_LEVEL:
      return <SelectingCharacterAILevelByPlayerOne character={navigation.characterTwo} />;
    case TRAINING_SELECTING_STAGE:
      return <SelectedCharacterCancellableByPlayerOne character={navigation.characterTwo} />;
    case VERSUS_SELECTING_CHARACTER_ONE:
    case VERSUS_SELECTING_STAGE:
      return <SelectedCharacterCancellableByPlayerTwo character={navigation.characterTwo} />;
    case TRAINING_FIGHTING:
    case VERSUS_FIGHTING:
    default:
      return null;
  }
}

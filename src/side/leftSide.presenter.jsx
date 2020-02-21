import React, { useEffect } from "react";
import useNavigation from "../navigation/useData.hook";
import SelectingCharacterByPlayerOne from "./left/selectingCharacterByPlayerOne.presenter";
import SelectedCharacterCancellableByPlayerOne from "./left/selectedCharacterCancellableByPlayerOne.presenter";
import SelectedCharacter from "./left/selectedCharacter.view";
import TRAINING_SELECTING_CHARACTER_ONE from "../navigation/state/trainingSelectingCharacterOne.state";
import TRAINING_SELECTING_CHARACTER_TWO from "../navigation/state/trainingSelectingCharacterTwo.state";
import TRAINING_SELECTING_STAGE from "../navigation/state/trainingSelectingStage.state";
import TRAINING_FIGHTING from "../navigation/state/trainingFighting.state";
import VERSUS_SELECTING_CHARACTERS from "../navigation/state/versusSelectingCharacters.state";
import VERSUS_SELECTING_CHARACTER_ONE from "../navigation/state/versusSelectingCharacterOne.state";
import VERSUS_SELECTING_CHARACTER_TWO from "../navigation/state/versusSelectingCharacterTwo.state";
import VERSUS_SELECTING_STAGE from "../navigation/state/versusSelectingStage.state";
import VERSUS_FIGHTING from "../navigation/state/versusFighting.state";

export default function LeftSide() {
  const navigation = useNavigation();

  switch (navigation.state) {
    case TRAINING_SELECTING_CHARACTER_ONE:
    case VERSUS_SELECTING_CHARACTERS:
    case VERSUS_SELECTING_CHARACTER_ONE:
      return <SelectingCharacterByPlayerOne />;
    case TRAINING_SELECTING_CHARACTER_TWO:
      return <SelectedCharacterCancellableByPlayerOne character={navigation.characterOne} />;
    case TRAINING_SELECTING_STAGE:
      return <SelectedCharacter character={navigation.characterOne} />;
    case VERSUS_SELECTING_CHARACTER_TWO:
    case VERSUS_SELECTING_STAGE:
      return <SelectedCharacterCancellableByPlayerOne character={navigation.characterOne} />;
    case TRAINING_FIGHTING:
    case VERSUS_FIGHTING:
    default:
      return null;
  }
}

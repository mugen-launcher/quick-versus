import React, { useEffect } from "react";
import useInputPlayerOne from "../input/useInputPlayerOne.hook";
import useInputPlayerTwo from "../input/useInputPlayerTwo.hook";
import useCategories from "../configuration/useCategories.hook";
import useCategoryIndex from "../category/useCategoryIndex.hook";
import useCharacterIndex from "../character/useCharacterIndex.hook";
import useCharacterName from "../character/useCharacterName.hook";
import useNavigation from "../navigation/useState.hook";
import useNavigationDispatch from "../navigation/useDispatch.hook";
import selectCharacterTwo from "../navigation/action/selectCharacterTwo.action";
import unselectCharacterTwo from "../navigation/action/unselectCharacterTwo.action";
import Zone from "./zonePlayerTwo.view";
import CategorySelector from "../category/categorySelector.view";
import CharacterSelector from "../character/characterSelector.view";
import Portrait from "./portraitPlayerTwo.view";
import CharacterName from "./characterNamePlayerTwo.view";
import Type from "./typePlayerTwo.view";
import TRAINING from "../navigation/mode/training.mode";
import VERSUS from "../navigation/mode/versus.mode";

export default function PlayerTwoPresenter() {
  const navigation = useNavigation();
  const dispatch = useNavigationDispatch();
  const categories = useCategories();
  const inputPlayerOne = useInputPlayerOne();
  const inputPlayerTwo = useInputPlayerTwo();

  let characterSelectionEnabled = false;
  let input;
  if (navigation.mode === TRAINING && navigation.characterOne) {
    input = inputPlayerOne;
    if (!navigation.characterTwo) {
      characterSelectionEnabled = true;
    }
  } else if (navigation.mode === VERSUS && !navigation.characterTwo) {
    characterSelectionEnabled = true;
    input = inputPlayerTwo;
  }

  const categoryIndex = useCategoryIndex(categories, input, characterSelectionEnabled);
  const category = categories[categoryIndex];
  const characters = category.characters;
  const characterIndex = useCharacterIndex(characters, input, characterSelectionEnabled);
  const character = characters[characterIndex];
  const characterName = useCharacterName(character);

  useEffect(() => {
    const onConfirm = () => {
      if (!navigation.characterTwo) {
        dispatch(selectCharacterTwo(character));
      }
    };
    const onCancel = () => {
      if (navigation.characterTwo) {
        dispatch(unselectCharacterTwo());
      }
    };

    if (input) {
      input.addEventListener("a", onConfirm);
      input.addEventListener("b", onCancel);
      input.addEventListener("escape", onCancel);
    }

    return () => {
      if (input) {
        input.removeEventListener("a", onConfirm);
        input.removeEventListener("b", onCancel);
        input.removeEventListener("escape", onCancel);
      }
    };
  }, [input, navigation.characterTwo]);

  const renderCharacterSelector = () => {
    if (navigation.characterTwo) {
      return;
    }

    return (
      <Zone>
        <CategorySelector category={category} />
        <CharacterSelector characters={characters} selectedCharacter={character} />
      </Zone>
    );
  };

  const renderCharacter = () => {
    if (navigation.mode === TRAINING && !navigation.characterOne) {
      return;
    }

    return (
      <>
        <Portrait character={character}/>
        {renderCharacterSelector()}
        <CharacterName>{characterName}</CharacterName>
      </>
    );
  };

  const renderType = () => {
    let type;
    switch (navigation.mode) {
      default:
      case TRAINING:
        type = "Computer";
        break;
      case VERSUS:
        type = "Player 2";
        break;
    }
    return <Type>{type}</Type>;
  };

  return (
    <>
      {renderCharacter()}
      {renderType()}
    </>
  );
}

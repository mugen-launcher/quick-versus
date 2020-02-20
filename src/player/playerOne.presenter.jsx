import React, { useEffect } from "react";
import useInput from "../input/useInputPlayerOne.hook";
import useCategories from "../configuration/useCategories.hook";
import useCategoryIndex from "../category/useCategoryIndex.hook";
import useCharacterIndex from "../character/useCharacterIndex.hook";
import useCharacterName from "../character/useCharacterName.hook";
import useNavigation from "../navigation/useState.hook";
import useNavigationDispatch from "../navigation/useDispatch.hook";
import selectCharacterOne from "../navigation/action/selectCharacterOne.action";
import unselectCharacterOne from "../navigation/action/unselectCharacterOne.action";
import switchMode from "../navigation/action/switchMode.action";
import Zone from "./zonePlayerOne.view";
import CategorySelector from "../category/categorySelector.view";
import CharacterSelector from "../character/characterSelector.view";
import Portrait from "./portraitPlayerOne.view";
import CharacterName from "./characterNamePlayerOne.view";
import Type from "./typePlayerOne.view";
import TRAINING from "../navigation/mode/training.mode";
import VERSUS from "../navigation/mode/versus.mode";

export default function PlayerOnePresenter() {
  const navigation = useNavigation();
  const dispatch = useNavigationDispatch();
  const categories = useCategories();
  const input = useInput();

  let characterSelectionEnabled = true;
  if (navigation.characterOne) {
    characterSelectionEnabled = false;
  }

  const categoryIndex = useCategoryIndex(categories, input, characterSelectionEnabled);
  const category = categories[categoryIndex];
  const characters = category.characters;
  const characterIndex = useCharacterIndex(characters, input, characterSelectionEnabled);
  const character = characters[characterIndex];
  const characterName = useCharacterName(character);

  useEffect(() => {
    const onConfirm = () => {
      if (!navigation.characterOne) {
        dispatch(selectCharacterOne(character));
      }
    };
    const onCancel = () => {
      if (
        (navigation.mode === TRAINING && navigation.characterOne && !navigation.characterTwo) ||
        (navigation.mode === VERSUS && navigation.characterOne)
      ) {
        dispatch(unselectCharacterOne());
      }
    };
    const onSwitchMode = () => {
      dispatch(switchMode());
    };

    input.addEventListener("a", onConfirm);
    input.addEventListener("b", onCancel);
    input.addEventListener("escape", onCancel);
    input.addEventListener("z", onSwitchMode);

    return () => {
      input.removeEventListener("a", onConfirm);
      input.removeEventListener("b", onCancel);
      input.removeEventListener("escape", onCancel);
      input.removeEventListener("z", onSwitchMode);
    };
  }, [input, character, navigation]);

  const renderCharacterSelector = () => {
    if (navigation.characterOne) {
      return;
    }

    return (
      <Zone>
        <CategorySelector category={category} />
        <CharacterSelector characters={characters} selectedCharacter={character} />
      </Zone>
    );
  }

  return (
    <>
      <Portrait character={character}/>
      {renderCharacterSelector()}
      <CharacterName>{characterName}</CharacterName>
      <Type>Player 1</Type>
    </>
  );
}

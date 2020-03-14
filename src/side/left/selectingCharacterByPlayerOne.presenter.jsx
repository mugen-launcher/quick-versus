import React, { useEffect } from "react";
import useInput from "../../input/useInputPlayerOne.hook";
import useCategories from "../../configuration/useCategories.hook";
import useCategoryIndex from "../../category/useCategoryIndex.hook";
import useCharacterIndex from "../../character/useCharacterIndex.hook";
import useCharacterName from "../../character/useCharacterName.hook";
import useRandomCharacter from "../../character/useRandomCharacter.hook";
import useNavigation from "../../navigation/useData.hook";
import useNavigationDispatch from "../../navigation/useDispatch.hook";
import useSelectCharacterSound from "../../configuration/useSelectCharacterSound.hook";
import selectCharacterOne from "../../navigation/action/selectCharacterOne.action";
import selectCharacterOneWithStyleAndColor from "../../navigation/action/selectCharacterOneWithSyleAndColor.action";
import switchMode from "../../navigation/action/switchMode.action";
import Zone from "./zone.view";
import CategorySelector from "../../category/categorySelector.view";
import CharacterSelector from "../../character/characterSelector.view";
import Portrait from "./portrait.view";
import StandAnimation from "./standAnimation.view";
import CharacterName from "./characterName.view";
import Type from "./type.view";
import getSelectableCharactersFromCategory from "../../character/util/getSelectableCharactersFromCategory";
import getRandomCharacter from "../../character/util/getRandomCharacter";

export default function SelectingCharacterByPlayerOne() {
  const navigation = useNavigation();
  const dispatch = useNavigationDispatch();
  const categories = useCategories();
  const input = useInput();
  const selectCharacterSound = useSelectCharacterSound();

  const categoryIndex = useCategoryIndex(categories, input, navigation.characterOneCategoryIndex);
  const category = categories[categoryIndex];
  const characters = category.characters || [];
  const characterIndex = useCharacterIndex(characters, input, navigation.characterOneIndex);
  const character = characters[characterIndex];
  const characterName = useCharacterName(character);

  const isRandomCategory = !!category.random;
  const randomCharacter = useRandomCharacter(categories, isRandomCategory);
  const randomCharacterName = useCharacterName(randomCharacter);

  useEffect(() => {
    const onConfirm = () => {
      if (isRandomCategory) {
        dispatch(selectCharacterOneWithStyleAndColor(randomCharacter, categoryIndex));
      } else if (character.random) {
        const randomCharacterInCategory = getRandomCharacter(getSelectableCharactersFromCategory(category));
        dispatch(selectCharacterOneWithStyleAndColor(randomCharacterInCategory, categoryIndex, characterIndex));
      } else {
        dispatch(selectCharacterOne(character, categoryIndex, characterIndex));
      }
      selectCharacterSound.play();
    };
    const onSwitchMode = () => {
      dispatch(switchMode());
    };

    input.addEventListener("a", onConfirm);
    input.addEventListener("z", onSwitchMode);

    return () => {
      input.removeEventListener("a", onConfirm);
      input.removeEventListener("z", onSwitchMode);
    };
  }, [
    input,
    isRandomCategory,
    randomCharacter,
    character,
    characters,
    categoryIndex,
    characterIndex,
    dispatch,
    selectCharacterSound
  ]);

  if (isRandomCategory) {
    return (
      <>
        <Zone>
          <CategorySelector category={category} />
        </Zone>
        <CharacterName>{randomCharacterName}</CharacterName>
        <Type>Player 1</Type>
      </>
    );
  }

  return (
    <>
      <Portrait character={character} />
      <Zone>
        <CategorySelector category={category} />
        <CharacterSelector characters={characters} selectedCharacter={character} />
      </Zone>
      <StandAnimation character={character} />
      <CharacterName>{characterName}</CharacterName>
      <Type>Player 1</Type>
    </>
  );
}

import React, { useEffect } from "react";
import useInput from "../../input/useInputPlayerTwo.hook";
import useCategories from "../../configuration/useCategories.hook";
import useCategoryIndex from "../../category/useCategoryIndex.hook";
import useCharacterIndex from "../../character/useCharacterIndex.hook";
import useCharacterName from "../../character/useCharacterName.hook";
import useRandomCharacter from "../../character/useRandomCharacter.hook";
import useNavigation from "../../navigation/useData.hook";
import useNavigationDispatch from "../../navigation/useDispatch.hook";
import useSelectCharacterSound from "../../configuration/useSelectCharacterSound.hook";
import selectCharacterTwo from "../../navigation/action/selectCharacterTwo.action";
import Zone from "./zone.view";
import CategorySelector from "../../category/categorySelector.view";
import CharacterSelector from "../../character/characterSelector.view";
import Portrait from "./portrait.view";
import StandAnimation from "./standAnimation.view";
import CharacterName from "./characterName.view";
import Type from "./type.view";

export default function SelectingCharacterByPlayerTwo() {
  const navigation = useNavigation();
  const dispatch = useNavigationDispatch();
  const categories = useCategories();
  const input = useInput();
  const selectCharacterSound = useSelectCharacterSound();

  const categoryIndex = useCategoryIndex(categories, input, navigation.characterTwoCategoryIndex);
  const category = categories[categoryIndex];
  const characters = category.characters || [];
  const characterIndex = useCharacterIndex(characters, input, navigation.characterTwoIndex);
  const character = characters[characterIndex];
  const characterName = useCharacterName(character);

  const isRandomCategory = !!category.random;
  const randomCharacter = useRandomCharacter(categories, isRandomCategory);
  const randomCharacterName = useCharacterName(randomCharacter);

  useEffect(() => {
    const onConfirm = () => {
      if (isRandomCategory) {
        dispatch(selectCharacterTwo(randomCharacter, categoryIndex));
      } else if (character.random) {
        const nonRandomCharacters = characters.filter(currentCharacter => !currentCharacter.random);
        const randomCharacterIndex = Math.floor(Math.random() * nonRandomCharacters.length);
        dispatch(selectCharacterTwo(nonRandomCharacters[randomCharacterIndex], categoryIndex, characterIndex));
      } else {
        dispatch(selectCharacterTwo(character, categoryIndex, characterIndex));
      }
      selectCharacterSound.play();
    };

    input.addEventListener("a", onConfirm);

    return () => {
      input.removeEventListener("a", onConfirm);
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
        <Type>Player 2</Type>
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
      <Type>Player 2</Type>
    </>
  );
}

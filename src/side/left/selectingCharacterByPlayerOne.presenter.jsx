import React, { useEffect } from "react";
import useInput from "../../input/useInputPlayerOne.hook";
import useCategories from "../../configuration/useCategories.hook";
import useCategoryIndex from "../../category/useCategoryIndex.hook";
import useCharacterIndex from "../../character/useCharacterIndex.hook";
import useCharacterName from "../../character/useCharacterName.hook";
import useNavigation from "../../navigation/useData.hook";
import useNavigationDispatch from "../../navigation/useDispatch.hook";
import useSelectCharacterSound from "../../configuration/useSelectCharacterSound.hook";
import selectCharacterOne from "../../navigation/action/selectCharacterOne.action";
import selectCharacterOneWithStyleAndColor from "../../navigation/action/selectCharacterOneWithSyleAndColor.action";
import switchMode from "../../navigation/action/switchMode.action";
import Zone from "./zone.view";
import CategoryPaginationZone from "./categoryPaginationZone.view";
import CategorySelector from "../../category/categorySelector.view";
import CategoryPagination from "../../category/categoryPagination.view";
import CharacterSelector from "../../character/characterSelector.view";
import Portrait from "./portrait.view";
import StandAnimation from "./standAnimation.view";
import CharacterName from "./characterName.view";
import Type from "./type.view";
import getSelectableCharactersFromCategories from "../../character/util/getSelectableCharactersFromCategories";
import getSelectableCharactersFromCategory from "../../character/util/getSelectableCharactersFromCategory";
import getRandomCharacter from "../../character/util/getRandomCharacter";
import RandomCharacterName from "../common/randomCharacterName.presenter";
import RandomCharacterNameFromCategory from "../common/randomCharacterNameFromCategory.presenter";
import { A, X } from "../../input/event";

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
  const isRandomCharacter = character && character.random;

  useEffect(() => {
    const onConfirm = () => {
      if (isRandomCategory) {
        const randomCharacter = getRandomCharacter(getSelectableCharactersFromCategories(categories));
        dispatch(selectCharacterOneWithStyleAndColor(randomCharacter, categoryIndex));
      } else if (character.random) {
        const randomCharacter = getRandomCharacter(getSelectableCharactersFromCategory(category));
        dispatch(selectCharacterOneWithStyleAndColor(randomCharacter, categoryIndex, characterIndex));
      } else {
        dispatch(selectCharacterOne(character, categoryIndex, characterIndex));
      }
      selectCharacterSound.play();
    };
    const onSwitchMode = () => {
      dispatch(switchMode());
    };

    input.addEventListener(A, onConfirm);
    input.addEventListener(X, onSwitchMode);

    return () => {
      input.removeEventListener(A, onConfirm);
      input.removeEventListener(X, onSwitchMode);
    };
  }, [
    input,
    categories,
    category,
    isRandomCategory,
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
        <CategoryPaginationZone>
          <CategoryPagination index={categoryIndex + 1} total={categories.length} />
        </CategoryPaginationZone>
        <CharacterName>
          <RandomCharacterName />
        </CharacterName>
        <Type>Player 1</Type>
      </>
    );
  }

  if (isRandomCharacter) {
    return (
      <>
        <Zone>
          <CategorySelector category={category} />
          <CharacterSelector characters={characters} selectedCharacter={character} />
        </Zone>
        <CategoryPaginationZone>
          <CategoryPagination index={categoryIndex + 1} total={categories.length} />
        </CategoryPaginationZone>
        <CharacterName>
          <RandomCharacterNameFromCategory category={category} />
        </CharacterName>
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
      <CategoryPaginationZone>
        <CategoryPagination index={categoryIndex + 1} total={categories.length} />
      </CategoryPaginationZone>
      <StandAnimation character={character} />
      <CharacterName>{characterName}</CharacterName>
      <Type>Player 1</Type>
    </>
  );
}

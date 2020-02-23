import React, { useEffect } from "react";
import useInput from "../../input/useInputPlayerTwo.hook";
import useCategories from "../../configuration/useCategories.hook";
import useCategoryIndex from "../../category/useCategoryIndex.hook";
import useCharacterIndex from "../../character/useCharacterIndex.hook";
import useCharacterName from "../../character/useCharacterName.hook";
import useNavigation from "../../navigation/useData.hook";
import useNavigationDispatch from "../../navigation/useDispatch.hook";
import selectCharacterTwo from "../../navigation/action/selectCharacterTwo.action";
import Zone from "./zone.view";
import CategorySelector from "../../category/categorySelector.view";
import CharacterSelector from "../../character/characterSelector.view";
import Portrait from "./portrait.view";
import CharacterName from "./characterName.view";
import Type from "./type.view";

export default function SelectingCharacterByPlayerTwo() {
  const navigation = useNavigation();
  const dispatch = useNavigationDispatch();
  const categories = useCategories();
  const input = useInput();

  const categoryIndex = useCategoryIndex(categories, input, navigation.characterTwoCategoryIndex);
  const category = categories[categoryIndex];
  const characters = category.characters;
  const characterIndex = useCharacterIndex(characters, input, navigation.characterTwoIndex);
  const character = characters[characterIndex];
  const characterName = useCharacterName(character);

  useEffect(() => {
    const onConfirm = () => {
      dispatch(selectCharacterTwo(character, categoryIndex, characterIndex));
    };

    input.addEventListener("a", onConfirm);

    return () => {
      input.removeEventListener("a", onConfirm);
    };
  }, [input, character]);

  return (
    <>
      <Portrait character={character}/>
      <Zone>
        <CategorySelector category={category} />
        <CharacterSelector characters={characters} selectedCharacter={character} />
      </Zone>
      <CharacterName>{characterName}</CharacterName>
      <Type>Player 2</Type>
    </>
  );
}
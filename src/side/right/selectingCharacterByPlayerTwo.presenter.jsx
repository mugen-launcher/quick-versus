import React, { useEffect } from "react";
import useInput from "../../input/useInputPlayerTwo.hook";
import useCategories from "../../configuration/useCategories.hook";
import useCategoryIndex from "../../category/useCategoryIndex.hook";
import useCharacterIndex from "../../character/useCharacterIndex.hook";
import useCharacterName from "../../character/useCharacterName.hook";
import useRandomCharacter from "../../character/useRandomCharacter.hook";
import useNavigation from "../../navigation/useData.hook";
import useNavigationDispatch from "../../navigation/useDispatch.hook";
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

  const categoryIndex = useCategoryIndex(categories, input, navigation.characterTwoCategoryIndex);
  const category = categories[categoryIndex];
  const characters = category.characters || [];
  const characterIndex = useCharacterIndex(characters, input, navigation.characterTwoIndex);
  const character = characters[characterIndex];

  const isRandomCategory = category.random ? true : false;
  const randomCharacter = useRandomCharacter(categories, isRandomCategory);

  useEffect(() => {
    const onConfirm = () => {
      if (isRandomCategory) {
        dispatch(selectCharacterTwo(randomCharacter, categoryIndex));
      } else if (character.random) {
        const nonRandomCharacters = characters.filter(character => !character.random);
        const randomCharacterIndex = Math.floor(Math.random() * nonRandomCharacters.length);
        const randomCharacter = nonRandomCharacters[randomCharacterIndex];
        dispatch(selectCharacterTwo(randomCharacter, categoryIndex, characterIndex));
      } else {
        dispatch(selectCharacterTwo(character, categoryIndex, characterIndex));
      }
    };

    input.addEventListener("a", onConfirm);

    return () => {
      input.removeEventListener("a", onConfirm);
    };
  }, [input, isRandomCategory, randomCharacter, character, characters]);

  const displayedCharacter = isRandomCategory ? randomCharacter : character;
  const characterName = useCharacterName(displayedCharacter);
  return (
    <>
      <Portrait character={displayedCharacter}/>
      <Zone>
        <CategorySelector category={category} />
        {!isRandomCategory && (
          <CharacterSelector characters={characters} selectedCharacter={displayedCharacter} />
        )}
      </Zone>
      <StandAnimation character={displayedCharacter}/>
      <CharacterName>{characterName}</CharacterName>
      <Type>Player 2</Type>
    </>
  );
}

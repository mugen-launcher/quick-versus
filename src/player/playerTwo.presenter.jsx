import React from "react";
import useInput from "../input/useInputPlayerTwo.hook";
import useCategories from "../configuration/useCategories.hook";
import useCategoryIndex from "../category/useCategoryIndex.hook";
import useCharacterIndex from "../character/useCharacterIndex.hook";
import PlayerTwo from "./playerTwo.view";

export default function PlayerTwoPresenter() {
  const categories = useCategories();
  const input = useInput();
  const categoryIndex = useCategoryIndex(categories, input);

  const category = categories[categoryIndex];
  const characters = category.characters;
  const characterIndex = useCharacterIndex(characters, input);
  const character = characters[characterIndex];

  return <PlayerTwo category={category} character={character} />;
}

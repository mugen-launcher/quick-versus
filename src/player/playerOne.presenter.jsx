import React from "react";
import useInputPlayerOne from "../input/useInputPlayerOne.hook";
import useCategories from "../configuration/useCategories.hook";
import useCategoryIndex from "../category/useCategoryIndex.hook";
import PlayerOne from "./playerOne.view";

export default function PlayerOnePresenter() {
  const categories = useCategories();
  const input = useInputPlayerOne();
  const categoryIndex = useCategoryIndex(categories, input);

  const category = categories[categoryIndex];
  return <PlayerOne category={category}/>;
}

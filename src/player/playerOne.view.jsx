import React from "react";
import CategorySelector from "../category/categorySelector.view";
import CharacterSelector from "../character/characterSelector.view";

export default function PlayerOne({ category }) {
  return (
    <>
      <CategorySelector category={category} />
      <CharacterSelector/>
    </>
  );
}

import React from "react";
import styled from "styled-components";
import CategorySelector from "../category/categorySelector.view";
import CharacterSelector from "../character/characterSelector.view";

const Wrapper = styled.section`
  position: absolute;
  left: 1vw;
  top: 1vh;
`;

export default function PlayerOne({ category }) {
  if (!category) {
    throw new Error("Unable to render player one without category");
  }

  let characters = [];
  if (category.characters && Array.isArray(category.characters)) {
    characters = category.characters;
  }

  return (
    <Wrapper>
      <CategorySelector category={category} />
      <CharacterSelector characters={characters}/>
    </Wrapper>
  );
}

import React from "react";
import styled from "styled-components";
import CategorySelector from "../category/categorySelector.view";
import CharacterSelector from "../character/characterSelector.view";
import { remote } from "electron";
import useEnvironment from "../configuration/useEnvironment.hook";
const fs = remote.require("fs");
const path = remote.require("path");

const Wrapper = styled.section`
  position: absolute;
  right: 1vw;
  top: 1vh;
`;
const Portrait = styled.img`
  position: absolute;
  right: 50vw;
  bottom: 0;
  height: 100vh;
  transform: translateX(100%) scaleX(-1);
`;

export default function PlayerTwo({ category, character }) {
  const environment = useEnvironment();

  if (!category) {
    throw new Error("Unable to render player one without category");
  }

  let characters = [];
  if (category.characters && Array.isArray(category.characters)) {
    characters = category.characters;
  }

  const renderPortrait = () => {
    if (!character || !character.portrait) {
      return null;
    }
    const imagePath = path.resolve(environment.currentDirectory, character.portrait);
    if (!fs.existsSync(imagePath)) {
      return null;
    }

    return <Portrait src={imagePath} />;
  };

  return (
    <>
      {renderPortrait()}
      <Wrapper>
        <CategorySelector category={category} />
        <CharacterSelector characters={characters} selectedCharacter={character} />
      </Wrapper>
    </>
  );
}

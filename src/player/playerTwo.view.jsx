import React from "react";
import styled from "styled-components";
import { remote } from "electron";
import CategorySelector from "../category/categorySelector.view";
import CharacterSelector from "../character/characterSelector.view";
import useEnvironment from "../configuration/useEnvironment.hook";
import useCharacterName from "../character/useCharacterName.hook";
const fs = remote.require("fs");
const path = remote.require("path");

const Wrapper = styled.section`
  position: absolute;
  right: 1vw;
  top: 1vh;
  display: flex;
  flex-direction: column;
  align-items: flex-end;
`;
const Portrait = styled.img`
  position: absolute;
  right: 50vw;
  bottom: 0;
  height: 100vh;
  transform: translateX(100%) scaleX(-1);
`;
const CharacterName = styled.h1`
  position: absolute;
  white-space: nowrap;
  left: 60vw;
  bottom: 3vh;
  font-family: BadaBoom;
  font-size: 10vh;
  color: #fff;
  margin: 0;
  text-shadow: 2px 2px 4px #000, 2px -2px 4px #000, -2px 2px 4px #000, -2px -2px 4px #000;
`;

export default function PlayerTwo({ category, character }) {
  const environment = useEnvironment();
  const characterName = useCharacterName(character);

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
      <CharacterName>{characterName}</CharacterName>
    </>
  );
}

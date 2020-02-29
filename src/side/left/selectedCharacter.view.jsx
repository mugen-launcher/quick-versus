import React, { useEffect } from "react";
import useCharacterName from "../../character/useCharacterName.hook";
import Portrait from "./portrait.view";
import StandAnimation from "./standAnimation.view";
import CharacterName from "./characterName.view";
import Type from "./type.view";

export default function SelectedCharacter({ character }) {
  const characterName = useCharacterName(character);

  return (
    <>
      <Portrait character={character}/>
      <StandAnimation character={character}/>
      <CharacterName>{characterName}</CharacterName>
      <Type>Player 1</Type>
    </>
  );
}

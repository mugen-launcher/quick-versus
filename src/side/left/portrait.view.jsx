import React from "react";
import styled from "styled-components";
import useCharacterPortrait from "../../character/useCharacterPortrait.hook";

const Image = styled.img`
  position: absolute;
  z-index: 100;
  left: ${props => props.x};
  bottom: 0;
  height: 100vh;
  transform: translateX(-100%);
`;

export default function Portrait({ character }) {
  const portrait = useCharacterPortrait(character);

  if (!portrait) {
    return null;
  }

  let x = "50vw";
  if (character.portraitOptions && character.portraitOptions.x) {
    x = character.portraitOptions.x;
  }

  return <Image src={portrait} x={x} key={JSON.stringify(character)}/>;
}

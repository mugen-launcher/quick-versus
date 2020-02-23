import React from "react";
import styled from "styled-components";
import useCharacterPortrait from "../../character/useCharacterPortrait.hook";

const Image = styled.img`
  position: absolute;
  z-index: 100;
  left: 50vw;
  bottom: 0;
  height: 100vh;
  transform: translateX(-100%);
`;

export default function Portrait({ character }) {
  const portrait = useCharacterPortrait(character);

  if (!portrait) {
    return null;
  }

  return <Image src={portrait} />;
}

import React from "react";
import styled from "styled-components";
import useCharacterNameOptions from "../../configuration/useCharacterNameOptions.hook";

const Wrapper = styled.div`
  position: absolute;
  z-index: 130;
  white-space: nowrap;
  left: ${props => props.x};
  bottom: 3vh;
  font-family: BadaBoom;
  font-size: 4vw;
  color: #fff;
  margin: 0;
  text-shadow: 2px 2px 4px #000, 2px -2px 4px #000, -2px 2px 4px #000, -2px -2px 4px #000;
  transform: translateX(-100%);
`;

export default function CharacterType({ children }) {
  const options = useCharacterNameOptions();

  let x = "40vw";
  if (options && options.x) {
    x = options.x;
  }

  return <Wrapper x={x}>{children}</Wrapper>;
}

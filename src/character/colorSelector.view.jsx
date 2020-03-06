import React from "react";
import styled from "styled-components";

const Wrapper = styled.div`
  position: relative;
  border: solid 1px #fff;
  padding: 2vh;
  margin: 5vh;
  background: rgba(0, 0, 0, 0.5);
`;

const Choice = styled.p`
  font-family: BadaBoom;
  font-size: 4vh;
  color: rgba(255, 255, 255, ${props => props.selected ? "1" : "0.5"});
  margin: 0;
  text-shadow: 0 0 4px #000;
`;

export default function ColorSelector({ index }) {

  return (
    <Wrapper>
      <Choice selected={index === 1}>Color 1</Choice>
      <Choice selected={index === 2}>Color 2</Choice>
      <Choice selected={index === 3}>Color 3</Choice>
    </Wrapper>
  );
}

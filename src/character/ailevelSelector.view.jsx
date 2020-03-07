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
  color: rgba(255, 255, 255, ${props => (props.selected ? "1" : "0.5")});
  margin: 0;
  text-shadow: 0 0 4px #000;
`;

export default function AILevelSelector({ level }) {
  return (
    <Wrapper>
      <Choice selected={level === 0}>No AI</Choice>
      <Choice selected={level === 1}>AI Level 1</Choice>
      <Choice selected={level === 2}>AI Level 2</Choice>
      <Choice selected={level === 3}>AI Level 3</Choice>
      <Choice selected={level === 4}>AI Level 4</Choice>
      <Choice selected={level === 5}>AI Level 5</Choice>
      <Choice selected={level === 6}>AI Level 6</Choice>
      <Choice selected={level === 7}>AI Level 7</Choice>
      <Choice selected={level === 8}>AI Level 8</Choice>
      <Choice selected={level === 9}>AI Level 9</Choice>
    </Wrapper>
  );
}

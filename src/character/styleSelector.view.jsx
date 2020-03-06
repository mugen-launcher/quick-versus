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

export default function StyleSelector({ names, index }) {
  const choices = [];
  for (let current = 0; current < names.length; current++) {
    choices.push(<Choice selected={current === index} key={names[current]}>{names[current]}</Choice>);
  }
  return (
    <Wrapper>
      {choices}
    </Wrapper>
  );
}

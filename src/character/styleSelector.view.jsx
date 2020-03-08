import React from "react";
import Wrapper from "./selector/wrapper.view";
import Title from "./selector/title.view";
import Choices from "./selector/choices.view";
import Choice from "./selector/choice.view";

export default function StyleSelector({ names, index }) {
  const choices = [];
  for (let current = 0; current < names.length; current++) {
    choices.push(
      <Choice selected={current === index} key={names[current]}>
        {names[current]}
      </Choice>
    );
  }
  return (
    <Wrapper>
      <Title>Select style</Title>
      <Choices>
        {choices}
      </Choices>
    </Wrapper>
  );
}

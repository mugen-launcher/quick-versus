import React from "react";
import Wrapper from "./selector/wrapper.view";
import Title from "./selector/title.view";
import Choices from "./selector/choices.view";
import Choice from "./selector/choice.view";

export default function ColorSelector({ total, index }) {
  const choices = [];
  for (let current = 1; current <= total; current++) {
    choices.push(
      <Choice selected={current === index} key={`color-${current}`}>
        {`Color ${current}`}
      </Choice>
    );
  }
  return (
    <Wrapper>
      <Title>Select color</Title>
      <Choices>
        {choices}
      </Choices>
    </Wrapper>
  );
}

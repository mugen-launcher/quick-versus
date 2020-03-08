import React from "react";
import Wrapper from "./selector/wrapper.view";
import Title from "./selector/title.view";
import Choices from "./selector/choices.view";
import Choice from "./selector/choice.view";

export default function AILevelSelector({ level }) {
  return (
    <Wrapper>
      <Title>Select AI</Title>
      <Choices>
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
      </Choices>
    </Wrapper>
  );
}

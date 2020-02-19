import React from "react";
import styled from "styled-components";
import CategorySelector from "../category/categorySelector.view";

const Wrapper = styled.section`
  position: absolute;
  right: 1vw;
  top: 1vh;
`;

export default function PlayerTwo({ category }) {
  return (
    <Wrapper>
      <CategorySelector category={category} />
    </Wrapper>
  );
}

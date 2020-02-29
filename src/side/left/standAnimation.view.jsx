import React from "react";
import styled from "styled-components";
import useCharacterStandAnimation from "../../character/useCharacterStandAnimation.hook";
import useCharacterSizeScale from "../../character/useCharacterSizeScale.hook";
import useCharacterAnimationOptions from "../../configuration/useCharacterAnimationOptions.hook";

const Image = styled.img`
  position: absolute;
  z-index: 120;
  left: ${props => props.x};
  bottom: 2vh;
  transform-origin: bottom right;
  transform:
    translateX(-100%)
    scaleX(${props => props.xScale})
    scaleY(${props => props.yScale})
  ;
`;

export default function StandAnimation({ character }) {
  const options = useCharacterAnimationOptions();
  const standAnimation = useCharacterStandAnimation(character);
  const scale = useCharacterSizeScale(character);

  if (!standAnimation) {
    return null;
  }

  let x = options.x;
  if (character.standOptions && character.standOptions.x) {
    x = character.standOptions.x;
  }

  let xScale = 1;
  let yScale = 1;
  if (scale) {
    xScale = scale.x;
    yScale = scale.y;
  }

  xScale *= options.scaleFactor;
  yScale *= options.scaleFactor;

  return <Image src={standAnimation} x={x} xScale={xScale} yScale={yScale} />;
}

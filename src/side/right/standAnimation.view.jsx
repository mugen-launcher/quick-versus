import React from "react";
import styled from "styled-components";
import useCharacterStandAnimation from "../../character/useCharacterStandAnimation.hook";
import useCharacterSizeScale from "../../character/useCharacterSizeScale.hook";
import useCharacterAnimationOptions from "../../configuration/useCharacterAnimationOptions.hook";

const Image = styled.img`
  position: absolute;
  z-index: 120;
  right: ${props => props.x};
  bottom: ${props => props.y};
  transform-origin: bottom right;
  transform: scaleX(${props => props.xScale * -1}) scaleY(${props => props.yScale});
`;

export default function StandAnimation({ character }) {
  const options = useCharacterAnimationOptions();
  const standAnimation = useCharacterStandAnimation(character);
  const scale = useCharacterSizeScale(character);

  if (!standAnimation) {
    return null;
  }

  let x = options.x;
  let y = options.y;
  if (character.standOptions) {
    if (character.standOptions.x) {
      x = character.standOptions.x;
    }
    if (character.standOptions.y) {
      y = character.standOptions.y;
    }
  }

  let xScale = 1;
  let yScale = 1;
  if (scale) {
    xScale = scale.x;
    yScale = scale.y;
  }

  xScale *= options.scaleFactor;
  yScale *= options.scaleFactor;

  return <Image src={standAnimation} x={x} y={y} xScale={xScale} yScale={yScale} />;
}

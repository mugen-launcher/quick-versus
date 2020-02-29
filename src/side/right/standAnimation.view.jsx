import React from "react";
import styled from "styled-components";
import useCharacterStandAnimation from "../../character/useCharacterStandAnimation.hook";
import useCharacterSizeScale from "../../character/useCharacterSizeScale.hook";
import useCharacterAnimationScaleFactor from "../../configuration/useCharacterAnimationScaleFactor.hook";

const Image = styled.img`
  position: absolute;
  z-index: 120;
  right: 47vw;
  bottom: 2vh;
  transform-origin: bottom right;
  transform:
    scaleX(${props => props.xScale * -1})
    scaleY(${props => props.yScale})
  ;
`;

export default function StandAnimation({ character }) {
  const scaleFactor = useCharacterAnimationScaleFactor();
  const standAnimation = useCharacterStandAnimation(character);
  const scale = useCharacterSizeScale(character);

  if (!standAnimation) {
    return null;
  }

  let xScale = 1;
  let yScale = 1;
  if (scale) {
    xScale = scale.x;
    yScale = scale.y;
  }

  xScale *= scaleFactor;
  yScale *= scaleFactor;

  return <Image src={standAnimation} xScale={xScale} yScale={yScale} />;
}

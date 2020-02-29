import React from "react";
import styled from "styled-components";
import useCharacterStandAnimation from "../../character/useCharacterStandAnimation.hook";
import useCharacterSizeScale from "../../character/useCharacterSizeScale.hook";

//translateX(${props => -100 + 100 * props.xScale}%)
const Image = styled.img`
  position: absolute;
  z-index: 110;
  left: 47vw;
  bottom: 2vh;
  transform-origin: bottom right;
  transform:
    translateX(-100%)
    scaleX(${props => props.xScale})
    scaleY(${props => props.yScale})
  ;
`;

export default function StandAnimation({ character }) {
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
  return <Image src={standAnimation} xScale={xScale} yScale={yScale} />;
}
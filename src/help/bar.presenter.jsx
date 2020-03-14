import React, { useEffect, useState } from "react";
import styled from "styled-components";
import useInputPlayerOne from "../input/useInputPlayerOne.hook";
import useInputPlayerTwo from "../input/useInputPlayerTwo.hook";
import NavigationHelper from "./navigationHelper.presenter";

const Bar = styled.div`
  position: absolute;
  z-index: 500;
  bottom: 0;
  left: 0;
  width: 100%;
  padding: 1vh 2vh;
  background: linear-gradient(to bottom, transparent, black);
  color: #fff;
  font-family: Gobold;
  font-size: 3vh;
  display: flex;
  flex-direction: row;
  align-items: center;
  transition: transform 1s ease;
  transform: translateY(${({ visible }) => (visible ? "0" : "100%")});
`;

export default function HelpBar() {
  const inputPlayerOne = useInputPlayerOne();
  const inputPlayerTwo = useInputPlayerTwo();
  const [visible, setVisibility] = useState(false);

  useEffect(() => {
    let timeout;
    const show = () => {
      setVisibility(true);
    };
    const hide = () => {
      setVisibility(false);

      clearTimeout(timeout);
      timeout = setTimeout(show, 5000);
    };
    hide();

    inputPlayerOne.addEventListener("*", hide);
    inputPlayerTwo.addEventListener("*", hide);

    return () => {
      inputPlayerOne.removeEventListener("*", hide);
      inputPlayerTwo.removeEventListener("*", hide);
    };
  }, [inputPlayerOne, inputPlayerTwo]);

  return (
    <Bar visible={visible}>
      <NavigationHelper />
    </Bar>
  );
}

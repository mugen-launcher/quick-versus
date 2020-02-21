import React from "react";
import styled from "styled-components";
import { remote } from "electron";
import useEnvironment from "../../configuration/useEnvironment.hook";
const fs = remote.require("fs");
const path = remote.require("path");

const Image = styled.img`
  position: absolute;
  z-index: 100;
  right: 50vw;
  bottom: 0;
  height: 100vh;
  transform: translateX(100%) scaleX(-1);
`;

export default function Portrait({ character }) {
  const environment = useEnvironment();

  if (!character || !character.portrait) {
    return null;
  }
  const imagePath = path.resolve(environment.currentDirectory, character.portrait);
  if (!fs.existsSync(imagePath)) {
    return null;
  }

  return <Image src={imagePath} />;
}

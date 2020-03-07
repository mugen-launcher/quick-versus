import React from "react";
import styled from "styled-components";
import { remote } from "electron";
import useEnvironment from "../configuration/useEnvironment.hook";

const fs = remote.require("fs");
const path = remote.require("path");

const Image = styled.img`
  position: absolute;
  top: 0;
  left: 0;
  width: 100vw;
  height: 100vh;
  object-fit: cover;
  z-index: 10;
`;

export default function Preview({ stage }) {
  const environment = useEnvironment();

  if (!stage || !stage.image) {
    return null;
  }
  const imagePath = path.resolve(environment.currentDirectory, "stages", stage.image);
  if (!fs.existsSync(imagePath)) {
    return null;
  }

  return <Image src={imagePath} />;
}

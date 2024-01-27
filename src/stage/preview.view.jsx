import React from "react";
import styled from "styled-components";
import useEnvironment from "../configuration/useEnvironment.hook";

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
  const imagePath = mainAPI.resolve(environment.currentDirectory, "stages", stage.image);
  if (!mainAPI.existsSync(imagePath)) {
    return null;
  }

  return <Image src={imagePath} />;
}

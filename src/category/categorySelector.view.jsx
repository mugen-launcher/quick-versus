import React from "react";
import styled from "styled-components";
import useEnvironment from "../configuration/useEnvironment.hook";

const Selector = styled.div`
  z-index: 2;
  position: relative;
  height: 12vh;
`;
const Image = styled.img`
  height: 10vh;
`;

const Text = styled.div`
  margin: 1vh 0;
  font-family: BadaBoom;
  font-size: 4vw;
  color: #fff;
  text-shadow: 1px 1px 2px #000, 1px -1px 2px #000, -1px 1px 2px #000, -1px -1px 2px #000;
`;

export default function CategorySelector({ category }) {
  const environment = useEnvironment();

  let imagePath;
  if (category && category.image) {
    const categoryImagePath = mainAPI.resolve(environment.currentDirectory, "chars", category.image);
    if (mainAPI.existsSync(categoryImagePath)) {
      imagePath = categoryImagePath;
    }
  }

  return (
    <Selector>
      {!imagePath && <Text>{category.name}</Text>}
      {imagePath && <Image src={imagePath} />}
    </Selector>
  );
}

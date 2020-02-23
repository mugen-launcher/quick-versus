import React from "react";
import styled from "styled-components";
import { remote } from "electron";
import categoryPlaceholder from "../assets/category-placeholder.png";
import randomCategory from "../assets/random-category.png";
import useEnvironment from "../configuration/useEnvironment.hook";
const fs = remote.require("fs");
const path = remote.require("path");

const Selector = styled.div`
  height: 12vh;
`;
const Image = styled.img`
  height: 10vh;
`;

export default function CategorySelector({ category }) {
  const environment = useEnvironment();

  let imagePath = categoryPlaceholder;
  if (category.random) {
    imagePath = randomCategory;
  }
  if (category && category.image) {
    const categoryImagePath = path.resolve(environment.currentDirectory, "chars", category.image);
    if (fs.existsSync(categoryImagePath)) {
      imagePath = categoryImagePath;
    }
  }

  return (
    <Selector>
      <Image class="category-image" src={imagePath} />
    </Selector>
  );
};

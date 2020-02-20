import React from "react";
import { remote } from "electron";
import ArrowLeft from "../assets/arrow-left-x.svg";
import ArrowRight from "../assets/arrow-right-y.svg";
import categoryPlaceholder from "../assets/category-placeholder.png";
import useEnvironment from "../configuration/useEnvironment.hook";
const fs = remote.require("fs");
const path = remote.require("path");

export default function CategorySelector({ category }) {
  const environment = useEnvironment();

  let imagePath = categoryPlaceholder;
  if (category && category.image) {
    const categoryImagePath = path.resolve(environment.currentDirectory, category.image);
    if (fs.existsSync(categoryImagePath)) {
      imagePath = categoryImagePath;
    }
  }

  return (
    <div class="category-selector">
      <img class="category-image" src={imagePath} />
    </div>
  );
};

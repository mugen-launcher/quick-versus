const React = require("react");
const remote = require("electron").remote;
const fs = remote.require("fs");
const path = remote.require("path");
const ArrowLeft = require("../assets/arrow-left-x.svg").default;
const ArrowRight = require("../assets/arrow-right-y.svg").default;
const categoryPlaceholder = require("../assets/category-placeholder.png");
const useEnvironment = require("../configuration/useEnvironment.hook");

module.exports = function CategorySelector({ category }) {
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
      <ArrowLeft class="category-arrow-left"/>
      <img class="category-image" src={imagePath} />
      <ArrowRight class="category-arrow-right"/>
    </div>
  );
};

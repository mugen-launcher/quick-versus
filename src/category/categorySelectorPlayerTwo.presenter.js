const React = require("react");
const { useState } = React;
const CategoryName = require("./categoryName.view");
const useCharacterCategories = require("../utils/useCharacterCategories.hook");

module.exports = function CategorySelectorPlayerTwo() {
  const categories = useCharacterCategories();

  const [selectedIndex, selectIndex] = useState(null);

  let categoryName = "RANDOM";
  if (selectedIndex !== null) {
    categoryName = categories[selectedIndex].name;
  }
  return <CategoryName value={categoryName} />;
};

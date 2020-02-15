const React = require("react");
const { useState } = React;
const CategorySelector = require("./categorySelector.view");
const useCharacterCategories = require("../utils/useCharacterCategories.hook");
const categoryPlaceholder = require("../assets/category-placeholder.png");

module.exports = function CategorySelectorPlayerTwo() {
  return <CategorySelector image={categoryPlaceholder} />;
};

const React = require("react");
const { useState } = React;
const CategorySelector = require("./categorySelector.view");
const useCategories = require("../configuration/useCategories.hook");

module.exports = function CategorySelectorPlayerTwo() {
  return <CategorySelector />;
};

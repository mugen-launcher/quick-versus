const React = require("react");
const remote = require("electron").remote;
const fs = remote.require("fs");
const path = remote.require("path");
const { useState, useEffect } = React;
const CategorySelector = require("./categorySelector.view");
const useCharacterCategories = require("../utils/useCharacterCategories.hook");
const useEnvironment = require("../utils/useEnvironment.hook");
const useKeyboard = require("../utils/useKeyboard.hook");
const useGamepad = require("../utils/useGamepad.hook");
const categoryPlaceholder = require("../assets/category-placeholder.png");

module.exports = function CategorySelectorPlayerOne() {
  const environment = useEnvironment();
  const categories = useCharacterCategories();
  const keyboard = useKeyboard();
  const gamepad = useGamepad();
  const [selectedIndex, selectIndex] = useState(0);

  useEffect(() => {
    const decreaseIndex = () => {
      if (selectedIndex > 0) {
        selectIndex(selectedIndex - 1);
      } else {
        selectIndex(categories.length - 1);
      }
    };
    const increaseIndex = () => {
      selectIndex((selectedIndex + 1) % categories.length);
    };

    keyboard.addEventListener("ArrowLeft", decreaseIndex);
    keyboard.addEventListener("ArrowRight", increaseIndex);
    gamepad.addEventListener("0-14", decreaseIndex);
    gamepad.addEventListener("0-15", increaseIndex);

    return () => {
      keyboard.removeEventListener("ArrowLeft", decreaseIndex);
      keyboard.removeEventListener("ArrowRight", increaseIndex);
      gamepad.removeEventListener("0-14", decreaseIndex);
      gamepad.removeEventListener("0-15", increaseIndex);
    };
  });

  let imagePath = categoryPlaceholder;
  if (categories[selectedIndex].image) {
    const categoryImagePath = path.resolve(environment.currentDirectory, categories[selectedIndex].image);
    if (fs.existsSync(categoryImagePath)) {
      imagePath = categoryImagePath;
    }
  }
  return <CategorySelector image={imagePath} />;
};

const React = require("react");
const { useState, useEffect } = React;
const CategorySelector = require("./categorySelector.view");
const useCategories = require("../configuration/useCategories.hook");
const useKeyboard = require("../input/useKeyboard.hook");
const useGamepad = require("../input/useGamepad.hook");
const useKeyboardMapping = require("../configuration/useKeyboardMappingPlayerOne.hook");

module.exports = function CategorySelectorPlayerOne() {
  const keyboardMapping = useKeyboardMapping();
  const categories = useCategories();
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

  return <CategorySelector category={categories[selectedIndex]} />;
};

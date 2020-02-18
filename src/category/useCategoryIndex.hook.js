import { useState, useEffect } from "react";

export default function useCategoryIndex(categories, input) {
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

    input.addEventListener("left", decreaseIndex);
    input.addEventListener("right", increaseIndex);

    return () => {
      input.removeEventListener("left", decreaseIndex);
      input.removeEventListener("right", increaseIndex);
    };
  }, [input, categories]);

  return selectedIndex;
}

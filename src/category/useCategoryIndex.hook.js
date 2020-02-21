import { useState, useEffect } from "react";

export default function useCategoryIndex(categories, input, initialIndex = 0) {
  const [selectedIndex, selectIndex] = useState(initialIndex);

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

    input.addEventListener("x", decreaseIndex);
    input.addEventListener("y", increaseIndex);

    return () => {
      input.removeEventListener("x", decreaseIndex);
      input.removeEventListener("y", increaseIndex);
    };
  }, [input, categories, selectedIndex]);

  return selectedIndex;
}

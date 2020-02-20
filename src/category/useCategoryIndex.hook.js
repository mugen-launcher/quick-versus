import { useState, useEffect } from "react";

export default function useCategoryIndex(categories, input, enabled) {
  const [selectedIndex, selectIndex] = useState(0);

  useEffect(() => {
    if (!enabled) {
      return;
    }

    let index = 0;
    const decreaseIndex = () => {
      if (index > 0) {
        index = index - 1;
      } else {
        index = categories.length - 1;
      }
      selectIndex(index);
    };
    const increaseIndex = () => {
      index = (index + 1) % categories.length;
      selectIndex(index);
    };

    input.addEventListener("x", decreaseIndex);
    input.addEventListener("y", increaseIndex);

    return () => {
      input.removeEventListener("x", decreaseIndex);
      input.removeEventListener("y", increaseIndex);
    };
  }, [input, categories, enabled]);

  return selectedIndex;
}

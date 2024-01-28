import { useState, useEffect } from "react";
import { L1, R1 } from "../input/event";

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

    input.addEventListener(L1, decreaseIndex);
    input.addEventListener(R1, increaseIndex);

    return () => {
      input.removeEventListener(L1, decreaseIndex);
      input.removeEventListener(R1, increaseIndex);
    };
  }, [input, categories, selectedIndex]);

  return selectedIndex;
}

import React, { useState, useEffect } from "react";
import CategorySelector from "./categorySelector.view";
import useCategories from "../configuration/useCategories.hook";

export default function CategorySelectorPresenter({ input }) {
  const categories = useCategories();
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

  return <CategorySelector category={categories[selectedIndex]} />;
}

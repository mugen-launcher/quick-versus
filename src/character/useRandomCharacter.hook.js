import { useState, useEffect } from "react";
import getSelectableCharactersFromCategories from "./util/getSelectableCharactersFromCategories";
import getRandomCharacter from "./util/getRandomCharacter";

export default function useRandomCharacter(categories, enabled) {
  const [selectedCharacter, selectCharacter] = useState();

  useEffect(() => {
    let requestId;
    const chooseRandomCharacter = () => {
      const selectableCharacters = getSelectableCharactersFromCategories(categories);
      const character = getRandomCharacter(selectableCharacters);
      selectCharacter(character);

      requestId = window.requestAnimationFrame(chooseRandomCharacter);
    };

    if (enabled) {
      chooseRandomCharacter();
    }

    return () => {
      window.cancelAnimationFrame(requestId);
    };
  }, [categories, enabled]);

  return selectedCharacter;
}

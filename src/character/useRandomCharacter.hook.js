import { useState, useEffect } from "react";

export default function useRandomCharacter(categories, enabled) {
  const [selectedCharacter, selectCharacter] = useState();

  useEffect(() => {
    let requestId;
    const chooseRandomCharacter = () => {
      const nonRandomCategories = categories.filter(category => {
        if (category.random) {
          return false;
        }
        if (!Array.isArray(category.characters)) {
          return false;
        }
        for (const character of category.characters) {
          if (!character.random) {
            return true;
          }
        }
        return false;
      });
      const randomCategoryIndex = Math.floor(Math.random() * nonRandomCategories.length);
      const category = nonRandomCategories[randomCategoryIndex];

      const nonRandomCharacters = category.characters.filter(character => !character.random);
      const randomCharacterIndex = Math.floor(Math.random() * nonRandomCharacters.length);
      const character = nonRandomCharacters[randomCharacterIndex];
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

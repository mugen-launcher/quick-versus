import getSelectableCharactersFromCategory from "./getSelectableCharactersFromCategory";

function nonRandomCategoryPredicate(category) {
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
}

export default function getSelectableCharactersFromCategories(categories) {
  const selectableCharacters = [];

  const nonRandomCategories = categories.filter(nonRandomCategoryPredicate);
  for (const category of nonRandomCategories) {
    selectableCharacters.push(...getSelectableCharactersFromCategory(category));
  }

  return selectableCharacters;
}

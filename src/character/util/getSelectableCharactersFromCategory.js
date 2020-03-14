function nonRandomCharacterPredicate(character) {
  return !character.random;
}

export default function getSelectableCharactersFromCategory(category) {
  const selectableCharacters = [];

  const nonRandomCharacters = category.characters.filter(nonRandomCharacterPredicate);
  selectableCharacters.push(...nonRandomCharacters);

  for (const character of nonRandomCharacters) {
    if (Array.isArray(character.styles)) {
      const nonRandomSubCharacters = character.styles.filter(nonRandomCharacterPredicate);
      selectableCharacters.push(...nonRandomSubCharacters);
    }
  }

  return selectableCharacters;
}

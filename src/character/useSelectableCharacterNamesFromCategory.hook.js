import getSelectableCharactersFromCategory from "./util/getSelectableCharactersFromCategory";
import getCharacterName from "./util/getCharacterName";
import useEnvironment from "../configuration/useEnvironment.hook";

const cache = new WeakMap();

export default function useSelectableCharacterNamesFromCategory(category) {
  const environment = useEnvironment();

  if (cache.has(category)) {
    return cache.get(category);
  }

  const names = [];
  const selectableCharacters = getSelectableCharactersFromCategory(category);
  for (const character of selectableCharacters) {
    const name = getCharacterName(character, environment.currentDirectory);
    names.push(name);
  }

  cache.set(category, names);
  return names;
}

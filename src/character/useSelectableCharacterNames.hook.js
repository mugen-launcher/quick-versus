import getSelectableCharactersFromCategories from "./util/getSelectableCharactersFromCategories";
import useCategories from "../configuration/useCategories.hook";
import getCharacterName from "./util/getCharacterName";
import useEnvironment from "../configuration/useEnvironment.hook";

let names;

export default function useSelectableCharacterNames() {
  const environment = useEnvironment();
  const categories = useCategories();

  if (names) {
    return names;
  }

  names = [];
  const selectableCharacters = getSelectableCharactersFromCategories(categories);
  for (const character of selectableCharacters) {
    const name = getCharacterName(character, environment.currentDirectory);
    names.push(name);
  }

  return names;
}

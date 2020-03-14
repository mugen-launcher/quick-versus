import getSelectableCharactersFromCategories from "./util/getSelectableCharactersFromCategories";
import useCategories from "../configuration/useCategories.hook";
import getCharacterName from "./util/getCharacterName";
import useEnvironment from "../configuration/useEnvironment.hook";

export default function useSelectableCharacterNames() {
  const environment = useEnvironment();
  const categories = useCategories();

  const names = [];
  const selectableCharacters = getSelectableCharactersFromCategories(categories);
  for (const character of selectableCharacters) {
    const name = getCharacterName(character, environment.currentDirectory);
    names.push(name);
  }

  return names;
}

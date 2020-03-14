import useEnvironment from "../configuration/useEnvironment.hook";
import getCharacterDefinition from "./util/getCharacterDefinition";

export default function useCharacterDefinition(character) {
  const environment = useEnvironment();
  return getCharacterDefinition(character, environment.currentDirectory);
}

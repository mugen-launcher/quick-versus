import useEnvironment from "../configuration/useEnvironment.hook";
import getCharacterName from "./util/getCharacterName";

export default function useCharacterName(character) {
  const environment = useEnvironment();
  return getCharacterName(character, environment.currentDirectory);
}

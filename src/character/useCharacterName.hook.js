import ini from "ini";
import useCharacterDefinition from "./useCharacterDefinition.hook";
import getObjectPropertyValueCaseInsensitive from "./util/getObjectPropertyValueCaseInsensitive";

const infoKeys = ["Info", "info"];
const nameKeys = ["displayname", "Displayname", "DisplayName", "name", "Name"];

export default function useCharacterName(character) {
  const definition = useCharacterDefinition(character);

  if (!character) {
    return "Unknown";
  }

  if (character.random) {
    return "Random";
  }

  if (!definition) {
    return "Unknown";
  }

  const info = getObjectPropertyValueCaseInsensitive(definition, "info");
  if (!info) {
    return "Unknown";
  }

  const displayName = getObjectPropertyValueCaseInsensitive(info, "displayname");
  if (displayName) {
    return ini.unsafe(displayName);
  }
  const name = getObjectPropertyValueCaseInsensitive(info, "name");
  if (name) {
    return ini.unsafe(name);
  }

  return "Unknown";
}

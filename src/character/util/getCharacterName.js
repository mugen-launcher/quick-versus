import ini from "ini";
import getCharacterDefinition from "./getCharacterDefinition";
import getObjectPropertyValueCaseInsensitive from "../../util/getObjectPropertyValueCaseInsensitive";

export default function getCharacterName(character, currentDirectory) {
  if (!character) {
    return "Unknown";
  }

  if (character.random) {
    return "Random";
  }

  const definition = getCharacterDefinition(character, currentDirectory);
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

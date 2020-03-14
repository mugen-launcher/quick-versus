import ini from "ini";
import { remote } from "electron";

const cache = new WeakMap();

export default function useCharacterDefinition(character, currentDirectory) {
  const fs = remote.require("fs");
  const path = remote.require("path");

  if (cache.has(character)) {
    return cache.get(character);
  }

  if (!character) {
    return null;
  }

  if (character.random) {
    return null;
  }

  if (!character.definition) {
    return null;
  }

  const definitionPath = path.resolve(currentDirectory, "chars", character.definition);
  if (!fs.existsSync(definitionPath)) {
    return null;
  }

  const definition = ini.parse(fs.readFileSync(definitionPath, "utf-8"));
  cache.set(character, definition);
  return definition;
}

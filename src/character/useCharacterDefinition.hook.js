import ini from "ini";
import { remote } from "electron";
import useEnvironment from "../configuration/useEnvironment.hook";
const fs = remote.require("fs");
const path = remote.require("path");

const cache = new WeakMap();

export default function useCharacterDefinition(character) {
  const environment = useEnvironment();

  if (cache.has(character)) {
    return cache.get(character);
  }

  if (!character) {
    return;
  }

  if (character.random) {
    return;
  }

  if (!character.definition) {
    return;
  }

  const definitionPath = path.resolve(environment.currentDirectory, "chars", character.definition);
  if (!fs.existsSync(definitionPath)) {
    return;
  }

  const definition = ini.parse(fs.readFileSync(definitionPath, "utf-8"));
  cache.set(character, definition);
  return definition;
}

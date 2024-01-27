import ini from "ini";

const cache = new WeakMap();

export default function useCharacterDefinition(character, currentDirectory) {
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

  const definitionPath = mainAPI.resolve(currentDirectory, "chars", character.definition);
  if (!mainAPI.existsSync(definitionPath)) {
    return null;
  }

  const definition = ini.parse(mainAPI.readFileSync(definitionPath));
  cache.set(character, definition);
  return definition;
}

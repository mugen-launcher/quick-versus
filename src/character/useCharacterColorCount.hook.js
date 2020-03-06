import useEnvironment from "../configuration/useEnvironment.hook";
import useCharacterDefinition from "./useCharacterDefinition.hook";

const cache = new WeakMap();

export default function useCharacterColorCount(character) {
  const definition = useCharacterDefinition(character);

  if (cache.has(character)) {
    return cache.get(character);
  }
  if (!definition) {
    return;
  }

  let count = 0;
  let index = 1;
  while (definition.Files.hasOwnProperty(`pal${index}`)) {
    count++;
    index++;
  }

  if (definition.hasOwnProperty("Palette Keymap")) {
    const keymap = definition["Palette Keymap"];
    for (let key in keymap) {
      count++;
    }
  }

  cache.set(character, count);
  return count;
}

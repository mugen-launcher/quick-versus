import useCharacterDefinition from "./useCharacterDefinition.hook";
import getObjectPropertyValueCaseInsensitive from "../util/getObjectPropertyValueCaseInsensitive";

const cache = new WeakMap();

export default function useCharacterColorCount(character) {
  const definition = useCharacterDefinition(character);

  if (cache.has(character)) {
    return cache.get(character);
  }
  if (!definition) {
    return 1;
  }

  const definitionFiles = getObjectPropertyValueCaseInsensitive(definition, "files");
  if (!definitionFiles) {
    return 1;
  }

  let count = 0;
  for (let index = 1; index <= 12; index++) {
    const palValue = getObjectPropertyValueCaseInsensitive(definitionFiles, `pal${index}`);
    if (palValue) {
      count++;
    }
  }

  if (!count) {
    const paletteKeymap = getObjectPropertyValueCaseInsensitive(definition, "Palette Keymap");
    if (paletteKeymap) {
      count += Object.keys(paletteKeymap).length;
    }
  }

  cache.set(character, count);
  return count;
}

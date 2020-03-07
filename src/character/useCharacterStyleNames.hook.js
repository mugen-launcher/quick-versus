import useCharacterDefinition from "./useCharacterDefinition.hook";

const cache = new WeakMap();

export default function useCharacterStyleNames(character) {
  const definition = useCharacterDefinition(character);

  if (cache.has(character)) {
    return cache.get(character);
  }
  if (!definition) {
    return [];
  }

  const list = [];
  if (character.styleName) {
    list.push(character.styleName);
  } else {
    list.push("Style 1");
  }

  if (Array.isArray(character.styles)) {
    for (let index = 0; index < character.styles.length; index++) {
      const style = character.styles[index];
      if (style.styleName) {
        list.push(style.styleName);
      } else {
        list.push(`Style ${index + 2}`);
      }
    }
  }

  cache.set(character, list);
  return list;
}

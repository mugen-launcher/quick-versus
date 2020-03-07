export default function useCharacterStyle(character, index) {
  if (index === 0) {
    return character;
  }

  if (!Array.isArray(character.styles) || index > character.styles.length) {
    return character;
  }

  return character.styles[index - 1];
}

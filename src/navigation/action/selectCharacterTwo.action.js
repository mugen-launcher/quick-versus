export const SELECT_CHARACTER_TWO = "selectCharacterTwo";

export default function selectCharacterTwo(character, categoryIndex, characterIndex) {
  return {
    type: SELECT_CHARACTER_TWO,
    character,
    categoryIndex,
    characterIndex
  };
}

export const SELECT_CHARACTER_ONE = "selectCharacterOne";

export default function selectCharacterOne(character, categoryIndex, characterIndex) {
  return {
    type: SELECT_CHARACTER_ONE,
    character,
    categoryIndex,
    characterIndex
  };
}

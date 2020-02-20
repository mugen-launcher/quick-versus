export const SELECT_CHARACTER_TWO = "selectCharacterTwo";

export default function selectCharacterTwo(character) {
  return {
    type: SELECT_CHARACTER_TWO,
    character
  };
}

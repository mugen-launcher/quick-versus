export const SELECT_CHARACTER_ONE = "selectCharacterOne";

export default function selectCharacterOne(character) {
  return {
    type: SELECT_CHARACTER_ONE,
    character
  };
}

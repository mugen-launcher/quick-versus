export const SELECT_CHARACTER_TWO_STYLE = "selectCharacterTwoStyle";

export default function selectCharacterTwoStyle(styleIndex, character) {
  return {
    type: SELECT_CHARACTER_TWO_STYLE,
    styleIndex,
    character
  };
}

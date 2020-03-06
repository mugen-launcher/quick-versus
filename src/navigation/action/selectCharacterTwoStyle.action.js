export const SELECT_CHARACTER_TWO_STYLE = "selectCharacterTwoStyle";

export default function selectCharacterTwoStyle(styleIndex) {
  return {
    type: SELECT_CHARACTER_TWO_STYLE,
    styleIndex
  };
}

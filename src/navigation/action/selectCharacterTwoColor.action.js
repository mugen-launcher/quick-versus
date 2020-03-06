export const SELECT_CHARACTER_TWO_COLOR = "selectCharacterTwoColor";

export default function selectCharacterTwoColor(colorIndex) {
  return {
    type: SELECT_CHARACTER_TWO_COLOR,
    colorIndex
  };
}

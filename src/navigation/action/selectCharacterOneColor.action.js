export const SELECT_CHARACTER_ONE_COLOR = "selectCharacterOneColor";

export default function selectCharacterOneColor(colorIndex) {
  return {
    type: SELECT_CHARACTER_ONE_COLOR,
    colorIndex
  };
}

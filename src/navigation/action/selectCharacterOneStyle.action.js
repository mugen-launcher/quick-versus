export const SELECT_CHARACTER_ONE_STYLE = "selectCharacterOneStyle";

export default function selectCharacterOneStyle(styleIndex) {
  return {
    type: SELECT_CHARACTER_ONE_STYLE,
    styleIndex
  };
}

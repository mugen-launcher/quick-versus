export const SELECT_CHARACTER_ONE_STYLE = "selectCharacterOneStyle";

export default function selectCharacterOneStyle(styleIndex, character) {
  return {
    type: SELECT_CHARACTER_ONE_STYLE,
    styleIndex,
    character
  };
}

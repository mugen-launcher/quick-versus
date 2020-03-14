export const SELECT_CHARACTER_ONE_WITH_STYLE_AND_COLOR = "selectCharacterOneWithStyleAndColor";

export default function selectCharacterOneWithStyleAndColor(character, categoryIndex, characterIndex) {
  return {
    type: SELECT_CHARACTER_ONE_WITH_STYLE_AND_COLOR,
    character,
    categoryIndex,
    characterIndex
  };
}

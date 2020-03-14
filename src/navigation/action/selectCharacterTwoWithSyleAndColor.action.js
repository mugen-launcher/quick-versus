export const SELECT_CHARACTER_TWO_WITH_STYLE_AND_COLOR = "selectCharacterTwoWithStyleAndColor";

export default function selectCharacterTwoWithStyleAndColor(character, categoryIndex, characterIndex) {
  return {
    type: SELECT_CHARACTER_TWO_WITH_STYLE_AND_COLOR,
    character,
    categoryIndex,
    characterIndex
  };
}

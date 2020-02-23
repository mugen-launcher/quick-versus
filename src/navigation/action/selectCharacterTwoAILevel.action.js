export const SELECT_CHARACTER_TWO_AI_LEVEL = "selectCharacterTwoAILevel";

export default function selectCharacterTwoAILevel(level) {
  return {
    type: SELECT_CHARACTER_TWO_AI_LEVEL,
    level
  };
}

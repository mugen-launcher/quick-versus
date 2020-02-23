export const SELECT_STAGE = "selectStage";

export default function selectStage(stage) {
  return {
    type: SELECT_STAGE,
    stage
  };
}

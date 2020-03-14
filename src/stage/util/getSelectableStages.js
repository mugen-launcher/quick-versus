export default function getSelectableStages(stages) {
  return stages.filter(stage => !stage.random);
}

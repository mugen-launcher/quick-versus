import TRAINING_SELECTING_STAGE from "../state/trainingSelectingStage.state";
import VERSUS_SELECTING_STAGE from "../state/versusSelectingStage.state";
import TRAINING_FIGHTING from "../state/trainingFighting.state";
import VERSUS_FIGHTING from "../state/versusFighting.state";

export default function selectStage(data, action) {
  const newData = { ...data, stage: action.stage };

  if (data.state === TRAINING_SELECTING_STAGE) {
    newData.state = TRAINING_FIGHTING;
    return newData;
  }

  if (data.state === VERSUS_SELECTING_STAGE) {
    newData.state = VERSUS_FIGHTING;
    return newData;
  }

  throw new Error(`Unable to select stage in state: ${data.state}`);
}

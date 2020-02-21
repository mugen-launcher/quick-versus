import React from "react";
import useState from "../navigation/useState.hook";
import TRAINING_SELECTING_STAGE from "../navigation/state/trainingSelectingStage.state";
import VERSUS_SELECTING_STAGE from "../navigation/state/versusSelectingStage.state";
import SelectingStageByPlayers from "./selectingStageByPlayers.presenter";

export default function StageSelector() {
  const state = useState();

  if (state !== TRAINING_SELECTING_STAGE && state !== VERSUS_SELECTING_STAGE) {
    return null;
  }

  return <SelectingStageByPlayers />;
}

import React from "react";
import useNavigation from "../navigation/useData.hook";
import TRAINING_SELECTING_STAGE from "../navigation/state/trainingSelectingStage.state";
import VERSUS_SELECTING_STAGE from "../navigation/state/versusSelectingStage.state";
import SELECTING_CHARACTER from "../navigation/sideState/selectingCharacter.state";
import SELECTING_STYLE from "../navigation/sideState/selectingStyle.state";
import SELECTING_COLOR from "../navigation/sideState/selectingColor.state";
import SELECTING_AI_LEVEL from "../navigation/sideState/selectingAILevel.state";
import TRAINING from "../navigation/mode/training.mode";
import ButtonA from "../assets/buttons/A.svg";
import ButtonB from "../assets/buttons/B.svg";
import ButtonX from "../assets/buttons/X.svg";
import ButtonY from "../assets/buttons/Y.svg";
import ButtonZ from "../assets/buttons/Z.svg";
import Directions from "../assets/buttons/4-directions.svg";
import Vertical from "../assets/buttons/vertical.svg";
import Horizontal from "../assets/buttons/horizontal.svg";
import Separator from "./separator.view";
import Label from "./label.view";

export default function NavigationHelper() {
  const { mode, state, leftSideState, rightSideState } = useNavigation();

  if (leftSideState === SELECTING_CHARACTER || rightSideState === SELECTING_CHARACTER) {
    return (
      <>
        <ButtonA height="3vh" />
        <Label>confirm</Label>
        <Separator />
        <ButtonB height="3vh" />
        <Label>cancel</Label>
        <Separator />
        <ButtonX height="3vh" />
        <Label>previous category</Label>
        <Separator />
        <ButtonY height="3vh" />
        <Label>next category</Label>
        <Separator />
        <ButtonZ height="3vh" />
        <Label>{mode === TRAINING ? "versus mode" : "training"}</Label>
        <Separator />
        <Directions height="3vh" />
        <Label>move cursor</Label>
      </>
    );
  }
  if (
    leftSideState === SELECTING_STYLE ||
    rightSideState === SELECTING_STYLE ||
    leftSideState === SELECTING_COLOR ||
    rightSideState === SELECTING_COLOR ||
    rightSideState === SELECTING_AI_LEVEL
  ) {
    return (
      <>
        <ButtonA height="3vh" />
        <Label>confirm</Label>
        <Separator />
        <ButtonB height="3vh" />
        <Label>cancel</Label>
        <Separator />
        <ButtonZ height="3vh" />
        <Label>{mode === TRAINING ? "versus mode" : "training"}</Label>
        <Separator />
        <Vertical height="3vh" />
        <Label>move cursor</Label>
      </>
    );
  }

  if (state === VERSUS_SELECTING_STAGE || state === TRAINING_SELECTING_STAGE) {
    return (
      <>
        <ButtonA height="3vh" />
        <Label>confirm</Label>
        <Separator />
        <ButtonB height="3vh" />
        <Label>cancel</Label>
        <Separator />
        <Horizontal height="3vh" />
        <Label>move cursor</Label>
      </>
    );
  }

  return "";
}

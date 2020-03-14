import React from "react";
import styled from "styled-components";
import { remote } from "electron";
import useNavigation from "../navigation/useData.hook";
import useNavigationDispatch from "../navigation/useDispatch.hook";
import endFight from "../navigation/action/endFight.action";
import TRAINING_FIGHTING from "../navigation/state/trainingFighting.state";
import VERSUS_FIGHTING from "../navigation/state/versusFighting.state";
import useEnvironment from "../configuration/useEnvironment.hook";
import useConfiguration from "../configuration/useConfiguration.hook";
import useBackgroundSound from "../configuration/useBackgroundSound.hook";

const execFile = remote.require("child_process").execFile;

const BlackScreen = styled.div`
  position: absolute;
  z-index: 200;
  top: 0;
  left: 0;
  width: 100vw;
  height: 100vh;
  background: black;
  color: white;
  font-size: 12vh;
  display: flex;
  align-items: center;
  justify-content: center;
`;

export default function Fight() {
  const configuration = useConfiguration();
  const navigation = useNavigation();
  const environment = useEnvironment();
  const dispatch = useNavigationDispatch();
  const backgroundSound = useBackgroundSound();

  if (navigation.state === TRAINING_FIGHTING || navigation.state === VERSUS_FIGHTING) {
    const options = [
      "-p1",
      navigation.characterOne.definition,
      "-p2",
      navigation.characterTwo.definition,
      "-s",
      navigation.stage.definition,
      "-rounds",
      2
    ];
    if (configuration.motif) {
      options.push("-r", configuration.motif);
    }
    if (navigation.characterOneColorIndex) {
      options.push("-p1.color", navigation.characterOneColorIndex);
    }
    if (navigation.characterTwoColorIndex) {
      options.push("-p2.color", navigation.characterTwoColorIndex);
    }
    if (navigation.characterTwoAILevel > 0) {
      options.push("-p2.ai", navigation.characterTwoAILevel);
    }

    backgroundSound.pause();
    remote.getCurrentWindow().minimize();
    execFile(
      environment.mugenPath,
      options,
      {
        cwd: environment.currentDirectory
      },
      () => {
        dispatch(endFight());
        backgroundSound.play();
        remote.getCurrentWindow().restore();
      }
    );
    console.log(environment.mugenPath, options);

    return <BlackScreen>Fighting ...</BlackScreen>;
  }

  return null;
}

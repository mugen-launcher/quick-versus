import React, { useEffect } from "react";
import styled from "styled-components";
import { remote } from "electron";
import useNavigation from "../navigation/useData.hook";
import useNavigationDispatch from "../navigation/useDispatch.hook";
import endFight from "../navigation/action/endFight.action";
import TRAINING_FIGHTING from "../navigation/state/trainingFighting.state";
import VERSUS_FIGHTING from "../navigation/state/versusFighting.state";
import useEnvironment from "../configuration/useEnvironment.hook";
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
  display: flex;
  align-items: center;
  justify-content: center;
`;

export default function Fight() {
  const navigation = useNavigation();
  const environment = useEnvironment();
  const dispatch = useNavigationDispatch();

  if (navigation.state === TRAINING_FIGHTING || navigation.state === VERSUS_FIGHTING) {
    const options = [
      "-p1", navigation.characterOne.definition,
      "-p2", navigation.characterTwo.definition,
      "-s", navigation.stage.definition
    ];
    if (navigation.state === TRAINING_FIGHTING) {
      options.push("-p2.ai", 1);
    }

    execFile(
      environment.mugenPath,
      options,
      {
        cwd: environment.currentDirectory
      },
      () => {
        dispatch(endFight());
      }
    );

    return <BlackScreen>Fighting ...</BlackScreen>;
  }

  return null;
}

import React from "react";
import styled from "styled-components";
import useNavigation from "../navigation/useData.hook";
import useNavigationDispatch from "../navigation/useDispatch.hook";
import endFight from "../navigation/action/endFight.action";
import TRAINING_FIGHTING from "../navigation/state/trainingFighting.state";
import VERSUS_FIGHTING from "../navigation/state/versusFighting.state";
import useEnvironment from "../configuration/useEnvironment.hook";
import useConfiguration from "../configuration/useConfiguration.hook";
import useBackgroundSound from "../configuration/useBackgroundSound.hook";

const execFile = (filePath, args, options, callback) => ipcRenderer.invoke("execFile", filePath, args, options, callback);

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
  const dispatch = useNavigationDispatch();
  const backgroundSound = useBackgroundSound();

  if (navigation.state === TRAINING_FIGHTING || navigation.state === VERSUS_FIGHTING) {
    const options = {
      characterOne: navigation.characterOne.definition,
      characterTwo: navigation.characterTwo.definition,
      stage: navigation.stage.definition
    };

    if (navigation.characterOneColorIndex) {
      options.characterOneColorIndex = navigation.characterOneColorIndex;
    }
    if (navigation.characterTwoColorIndex) {
      options.characterTwoColorIndex = navigation.characterTwoColorIndex;
    }
    if (navigation.characterTwoAILevel > 0) {
      options.characterTwoAILevel = navigation.characterTwoAILevel;
    }

    backgroundSound.pause();
    mainAPI.minimize();
    mainAPI.launchGame(options).then(() => {
      dispatch(endFight());
      backgroundSound.play();
      mainAPI.restore();
    });
    console.log("launchGame", options);

    return <BlackScreen>Fighting ...</BlackScreen>;
  }

  return null;
}

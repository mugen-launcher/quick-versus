import { useMemo } from "react";
import { remote } from "electron";
import useConfiguration from "./useConfiguration.hook";
import useEnvironment from "./useEnvironment.hook";
import noSound from "./noSound";
const path = remote.require("path");

export default function useSelectAILevelSound() {
  const environment = useEnvironment();
  const configuration = useConfiguration();

  return useMemo(() => {
    if (!configuration.sound) {
      return noSound;
    }

    if (!configuration.sound.selectAILevel) {
      return noSound;
    }

    const filePath = path.resolve(environment.currentDirectory, configuration.sound.selectAILevel);
    const audio = new Audio(filePath);
    return {
      play: () => {
        audio.pause();
        audio.currentTime = 0;
        audio.play();
      }
    }
  });
}

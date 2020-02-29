import { useMemo } from "react";
import { remote } from "electron";
import useConfiguration from "./useConfiguration.hook";
import useEnvironment from "./useEnvironment.hook";
import noSound from "./noSound";
const path = remote.require("path");

export default function useMoveCursorSound() {
  const environment = useEnvironment();
  const configuration = useConfiguration();

  if (!configuration.sound) {
    return noSound;
  }

  if (!configuration.sound.moveCursor) {
    return noSound;
  }

  return useMemo(() => {
    const filePath = path.resolve(environment.currentDirectory, configuration.sound.moveCursor);
    const audio = new Audio(filePath);
    return {
      play: () => {
        audio.currentTime = 0;
        audio.play();
      }
    }
  });
}

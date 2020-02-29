import { useMemo } from "react";
import { remote } from "electron";
import useConfiguration from "./useConfiguration.hook";
import useEnvironment from "./useEnvironment.hook";
import useSoundVolume from "./useSoundVolume.hook";
import noSound from "./noSound";
const path = remote.require("path");

export default function useMoveCursorSound() {
  const environment = useEnvironment();
  const configuration = useConfiguration();
  const volume = useSoundVolume();

  return useMemo(() => {
    if (!configuration.sound) {
      return noSound;
    }

    if (!configuration.sound.moveCursor) {
      return noSound;
    }

    const filePath = path.resolve(environment.currentDirectory, configuration.sound.moveCursor);
    const audio = new Audio(filePath);
    audio.volume = volume / 100;
    return {
      play: () => {
        audio.pause();
        audio.currentTime = 0;
        audio.play();
      }
    }
  });
}

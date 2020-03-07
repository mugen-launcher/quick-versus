import { remote } from "electron";
import useConfiguration from "./useConfiguration.hook";
import useEnvironment from "./useEnvironment.hook";
import useSoundVolume from "./useSoundVolume.hook";
import noSound from "./noSound";

const path = remote.require("path");

let cache;

export default function useSelectCharacterSound() {
  const environment = useEnvironment();
  const configuration = useConfiguration();
  const volume = useSoundVolume();

  if (cache) {
    return cache;
  }

  if (!configuration.sound) {
    return noSound;
  }

  if (!configuration.sound.selectCharacter) {
    return noSound;
  }

  const filePath = path.resolve(environment.currentDirectory, configuration.sound.selectCharacter);
  const audio = new Audio(filePath);
  audio.volume = volume / 100;
  const sound = {
    play: () => {
      audio.pause();
      audio.currentTime = 0;
      audio.play();
    }
  };
  cache = sound;
  return sound;
}

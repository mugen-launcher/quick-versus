import useConfiguration from "./useConfiguration.hook";
import useEnvironment from "./useEnvironment.hook";
import useSoundVolume from "./useSoundVolume.hook";
import noSound from "./noSound";

let cache;
export default function useSelectStyleSound() {
  const environment = useEnvironment();
  const configuration = useConfiguration();
  const volume = useSoundVolume();

  if (cache) {
    return cache;
  }

  if (!configuration.sound) {
    return noSound;
  }

  if (!configuration.sound.selectStyle) {
    return noSound;
  }

  const filePath = mainAPI.resolve(environment.currentDirectory, configuration.sound.selectStyle);
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

import useConfiguration from "./useConfiguration.hook";

export default function useSoundVolume() {
  const configuration = useConfiguration();

  if (configuration.sound && configuration.sound.volume) {
    return configuration.sound.volume;
  }

  return 100;
}

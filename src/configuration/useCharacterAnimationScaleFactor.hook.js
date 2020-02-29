import useConfiguration from "./useConfiguration.hook";

export default function useCharacterAnimationScaleFactor() {
  const configuration = useConfiguration();

  if (configuration.characterAnimationScaleFactor) {
    return configuration.characterAnimationScaleFactor;
  }

  return 1;
}

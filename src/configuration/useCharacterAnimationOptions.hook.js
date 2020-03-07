import useConfiguration from "./useConfiguration.hook";

export default function useCharacterAnimationOptions() {
  const configuration = useConfiguration();

  let x = "47vw";
  let y = "2vh";
  let scaleFactor = 1;
  if (configuration.characterAnimationOptions) {
    if (configuration.characterAnimationOptions.x) {
      ({ x } = configuration.characterAnimationOptions);
    }
    if (configuration.characterAnimationOptions.y) {
      ({ y } = configuration.characterAnimationOptions.y);
    }
    if (configuration.characterAnimationOptions.scaleFactor) {
      ({ scaleFactor } = configuration.characterAnimationOptions);
    }
  }

  return { x, y, scaleFactor };
}

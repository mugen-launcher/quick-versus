import useConfiguration from "./useConfiguration.hook";

export default function useCharacterAnimationOptions() {
  const configuration = useConfiguration();

  let x = "47vw";
  let y = "2vh";
  let scaleFactor = 1;
  if (configuration.characterAnimationOptions) {
    if (configuration.characterAnimationOptions.x) {
      x = configuration.characterAnimationOptions.x;
    }
    if (configuration.characterAnimationOptions.y) {
      y = configuration.characterAnimationOptions.x;
    }
    if (configuration.characterAnimationOptions.scaleFactor) {
      scaleFactor = configuration.characterAnimationOptions.scaleFactor;
    }
  }

  return { x, y, scaleFactor };
}

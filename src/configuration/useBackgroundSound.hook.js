import useEnvironment from "./useEnvironment.hook";
import noSound from "./noSound";

export default function useBackgroundSound() {
  const environment = useEnvironment();

  if (environment.backgroundSound) {
    return environment.backgroundSound;
  }

  return noSound;
}

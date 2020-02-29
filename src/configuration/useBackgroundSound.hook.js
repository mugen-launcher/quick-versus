import { remote } from "electron";
import useEnvironment from "./useEnvironment.hook";
import noSound from "./noSound";
const path = remote.require("path");

export default function useBackgroundSound() {
  const environment = useEnvironment();

  if (environment.backgroundSound) {
    return environment.backgroundSound;
  }

  return noSound;
}

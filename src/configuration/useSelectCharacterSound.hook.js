import { useMemo } from "react";
import { remote } from "electron";
import useConfiguration from "./useConfiguration.hook";
import useEnvironment from "./useEnvironment.hook";
const path = remote.require("path");

export default function useSelectCharacterSound() {
  const environment = useEnvironment();
  const configuration = useConfiguration();

  if (!configuration.sound) {
    return;
  }

  if (!configuration.sound.selectCharacter) {
    return;
  }

  return useMemo(() => {
    const filePath = path.resolve(environment.currentDirectory, configuration.sound.selectCharacter);
    return new Audio(filePath);
  });
}

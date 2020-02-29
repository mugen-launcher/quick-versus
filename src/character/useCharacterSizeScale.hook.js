import { useMemo } from "react";
import ini from "ini";
import { remote } from "electron";
import useEnvironment from "../configuration/useEnvironment.hook";
import useCharacterDefinition from "./useCharacterDefinition.hook";
const fs = remote.require("fs");
const path = remote.require("path");

export default function useCharacterSizeScale(character) {
  const environment = useEnvironment();
  const definition = useCharacterDefinition(character);
  if (!definition) {
    return "Unknown";
  }

  return useMemo(() => {
    const definitionPath = path.resolve(environment.currentDirectory, "chars", character.definition);
    const directoryPath = path.dirname(definitionPath);
    const constantsFilename = ini.unsafe(definition.Files.cns);
    const constantsPath = path.resolve(directoryPath, constantsFilename);

    const constants = ini.parse(fs.readFileSync(constantsPath, "utf-8"));
    return {
      x: constants.Size.xscale,
      y: constants.Size.yscale
    };
  }, [character]);
}

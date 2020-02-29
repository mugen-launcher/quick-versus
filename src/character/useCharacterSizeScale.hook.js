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
    return;
  }

  return useMemo(() => {
    const definitionPath = path.resolve(environment.currentDirectory, "chars", character.definition);
    const directoryPath = path.dirname(definitionPath);
    let constantsFilename;
    if (definition.Files.cns) {
      constantsFilename = ini.unsafe(definition.Files.cns);
    } else if (definition.Files.Cns) {
      constantsFilename = ini.unsafe(definition.Files.Cns);
    } else {
      return;
    }
    const constantsPath = path.resolve(directoryPath, constantsFilename);

    const constants = ini.parse(fs.readFileSync(constantsPath, "utf-8"));
    return {
      x: constants.Size.xscale,
      y: constants.Size.yscale
    };
  }, [character]);
}

import { useMemo } from "react";
import ini from "ini";
import { remote } from "electron";
import useEnvironment from "../configuration/useEnvironment.hook";
const fs = remote.require("fs");
const path = remote.require("path");

export default function useCharacterDefinition(character) {
  const environment = useEnvironment();
  return useMemo(() => {
    if (!character) {
      return;
    }

    if (character.random) {
      return;
    }

    if (!character.definition) {
      return;
    }

    const definitionPath = path.resolve(environment.currentDirectory, "chars", character.definition);
    if (!fs.existsSync(definitionPath)) {
      return;
    }

    const definition = ini.parse(fs.readFileSync(definitionPath, "utf-8"));
    return definition;
  }, [character]);
}

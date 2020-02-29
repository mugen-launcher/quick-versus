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

  return useMemo(() => {
    if (!definition) {
      return;
    }

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
    constantsFilename = constantsFilename.replace(/\\/g, "/");
    const constantsPath = path.resolve(directoryPath, constantsFilename);

    try {
      const fileContent = fs.readFileSync(constantsPath, "utf-8");
      const constants = ini.parse(fileContent);

      let x = 1;
      let y = 1;
      if (constants.Size) {
        if (constants.Size.xscale) {
          x = Number(constants.Size.xscale);
        } else if (constants.Size.xScale) {
          x = Number(constants.Size.xScale);
        } else {
          throw new Error("xscale not found");
        }
        if (constants.Size.yscale) {
          y = Number(constants.Size.yscale);
        } else if (constants.Size.yScale) {
          y = Number(constants.Size.yScale);
        } else {
          throw new Error("yscale not found");
        }
      } else {
        if (constants.xscale) {
          x = Number(constants.xscale);
        }
        if (constants.xscale) {
          y = Number(constants.yscale);
        }
      }

      if (isNaN(x)) {
        throw new Error("xscale is not a number");
      }
      if (isNaN(y)) {
        throw new Error("yscale is not a number");
      }

      return { x, y };
    } catch (error) {
      console.error("Unable to load constants file", constantsPath);
      console.error(error);
      return;
    }
  }, [character, definition]);
}

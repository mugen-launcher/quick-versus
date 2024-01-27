import ini from "ini";
import useEnvironment from "../configuration/useEnvironment.hook";
import useCharacterDefinition from "./useCharacterDefinition.hook";
import getObjectPropertyValueCaseInsensitive from "../util/getObjectPropertyValueCaseInsensitive";

const cache = new WeakMap();

export default function useCharacterSizeScale(character) {
  const environment = useEnvironment();
  const definition = useCharacterDefinition(character);

  if (cache.has(character)) {
    return cache.get(character);
  }
  if (!definition) {
    return { x: 1, y: 1 };
  }

  const definitionPath = mainAPI.resolve(environment.currentDirectory, "chars", character.definition);
  const directoryPath = mainAPI.dirname(definitionPath);

  const definitionFiles = getObjectPropertyValueCaseInsensitive(definition, "files");
  if (!definitionFiles) {
    return { x: 1, y: 1 };
  }

  const cns = getObjectPropertyValueCaseInsensitive(definitionFiles, "cns");
  if (!cns) {
    return { x: 1, y: 1 };
  }
  let constantsFilename = ini.unsafe(cns);
  constantsFilename = constantsFilename.replace(/\\/g, "/");
  const constantsPath = mainAPI.resolve(directoryPath, constantsFilename);

  try {
    const fileContent = mainAPI.readFileSync(constantsPath);
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

    if (Number.isNaN(x)) {
      throw new Error("xscale is not a number");
    }
    if (Number.isNaN(y)) {
      throw new Error("yscale is not a number");
    }

    const scale = { x, y };
    cache.set(character, scale);
    return scale;
  } catch (error) {
    console.error("Unable to load constants file", constantsPath);
    console.error(error);
  }

  return { x: 1, y: 1 };
}

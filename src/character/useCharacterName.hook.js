import ini from "ini";
import { remote } from "electron";
import useEnvironment from "../configuration/useEnvironment.hook";
const fs = remote.require("fs");
const path = remote.require("path");

export default function useCharacterName(character) {
  const environment = useEnvironment();

  if (!character || !character.definition) {
    return "Unknown";
  }

  const definitionPath = path.resolve(environment.currentDirectory, "chars", character.definition);
  if (!fs.existsSync(definitionPath)) {
    return "Unknown";
  }

  const definition = ini.parse(fs.readFileSync(definitionPath, "utf-8"));

  if (definition.Info.displayname) {
    return ini.unsafe(definition.Info.displayname);
  }
  if (definition.Info.name) {
    return ini.unsafe(definition.Info.name);
  }
  if (definition.Info.Displayname) {
    return ini.unsafe(definition.Info.Displayname);
  }
  if (definition.Info.Name) {
    return ini.unsafe(definition.Info.Name);
  }
  return "Unknown";
}

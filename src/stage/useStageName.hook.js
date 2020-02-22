import ini from "ini";
import { remote } from "electron";
import useEnvironment from "../configuration/useEnvironment.hook";
const fs = remote.require("fs");
const path = remote.require("path");

export default function useStageName(stage) {
  const environment = useEnvironment();

  if (!stage || !stage.definition) {
    return "Unknown";
  }

  const definitionPath = path.resolve(environment.currentDirectory, "stages", stage.definition);
  if (!fs.existsSync(definitionPath)) {
    return "Unknown";
  }

  const definition = ini.parse(fs.readFileSync(definitionPath, "utf-8"));

  if (definition.Info.displayname) {
    return ini.unsafe(definition.Info.displayname);
  }
  return ini.unsafe(definition.Info.name);
}

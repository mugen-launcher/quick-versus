import ini from "ini";
import { remote } from "electron";
import useEnvironment from "../configuration/useEnvironment.hook";
import getObjectPropertyValueCaseInsensitive from "../util/getObjectPropertyValueCaseInsensitive";

const fs = remote.require("fs");
const path = remote.require("path");

export default function useStageName(stage) {
  const environment = useEnvironment();

  if (!stage) {
    return "Unknown";
  }

  if (stage.random) {
    return "Random";
  }

  if (!stage.definition) {
    return "Unknown";
  }

  const definitionPath = path.resolve(environment.currentDirectory, "stages", stage.definition);
  if (!fs.existsSync(definitionPath)) {
    return "Unknown";
  }

  const definition = ini.parse(fs.readFileSync(definitionPath, "utf-8"));

  const info = getObjectPropertyValueCaseInsensitive(definition, "info");
  if (!info) {
    return "Unknown";
  }

  const displayName = getObjectPropertyValueCaseInsensitive(info, "displayname");
  if (displayName) {
    return ini.unsafe(displayName);
  }

  const name = getObjectPropertyValueCaseInsensitive(info, "name");
  if (name) {
    return ini.unsafe(name);
  }

  return "Unknown";
}

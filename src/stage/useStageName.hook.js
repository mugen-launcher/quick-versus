import ini from "ini";
import useEnvironment from "../configuration/useEnvironment.hook";
import getObjectPropertyValueCaseInsensitive from "../util/getObjectPropertyValueCaseInsensitive";

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

  const definitionPath = mainAPI.resolve(environment.currentDirectory, "stages", stage.definition);
  if (!mainAPI.existsSync(definitionPath)) {
    return "Unknown";
  }

  const definition = ini.parse(mainAPI.readFileSync(definitionPath));

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

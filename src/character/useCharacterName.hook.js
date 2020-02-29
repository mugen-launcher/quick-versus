import ini from "ini";
import { remote } from "electron";
import useCharacterDefinition from "./useCharacterDefinition.hook";
const fs = remote.require("fs");
const path = remote.require("path");

export default function useCharacterName(character) {
  const definition = useCharacterDefinition(character);
  if (!definition) {
    return "Unknown";
  }

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

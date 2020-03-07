import { remote } from "electron";
import useEnvironment from "../configuration/useEnvironment.hook";

const fs = remote.require("fs");
const path = remote.require("path");

export default function useCharacterPortrait(character) {
  const environment = useEnvironment();

  if (!character) {
    return null;
  }

  if (character.random) {
    return null;
  }

  const definitionPath = path.resolve(environment.currentDirectory, "chars", character.definition);
  const directoryPath = path.dirname(definitionPath);
  const imagePathsByPriority = [path.resolve(directoryPath, "portrait.png")];
  if (character.portrait) {
    imagePathsByPriority.push(path.resolve(directoryPath, character.portrait));
    imagePathsByPriority.push(path.resolve(environment.currentDirectory, character.portrait));
    imagePathsByPriority.push(path.resolve(environment.currentDirectory, "chars", character.portrait));
  }

  for (const imagePath of imagePathsByPriority) {
    if (fs.existsSync(imagePath)) {
      return imagePath;
    }
  }

  return null;
}

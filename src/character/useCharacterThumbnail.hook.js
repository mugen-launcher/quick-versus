import { remote } from "electron";
import useEnvironment from "../configuration/useEnvironment.hook";
const fs = remote.require("fs");
const path = remote.require("path");

export default function useCharacterThumbnail(character) {
  const environment = useEnvironment();

  if (!character) {
    return null;
  }

  const definitionPath = path.resolve(environment.currentDirectory, "chars", character.definition);
  const directoryPath = path.dirname(definitionPath);
  const imagePathsByPriority = [path.resolve(directoryPath, "thumbnail.png")];
  if (character.thumbnail) {
    imagePathsByPriority.push(path.resolve(directoryPath, character.thumbnail));
    imagePathsByPriority.push(path.resolve(environment.currentDirectory, character.thumbnail));
    imagePathsByPriority.push(path.resolve(environment.currentDirectory, "chars", character.thumbnail));
  }

  for (const imagePath of imagePathsByPriority) {
    if (fs.existsSync(imagePath)) {
      return imagePath;
    }
  }

  return null;
}

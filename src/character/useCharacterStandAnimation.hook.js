import { remote } from "electron";
import useEnvironment from "../configuration/useEnvironment.hook";

const fs = remote.require("fs");
const path = remote.require("path");

export default function useCharacterStandAnimation(character, colorIndex = 1) {
  const environment = useEnvironment();

  if (!character) {
    return null;
  }

  if (character.random) {
    return null;
  }

  let propertyName = "stand";
  if (colorIndex > 1) {
    propertyName = `stand${colorIndex}`;
  }

  const definitionPath = path.resolve(environment.currentDirectory, "chars", character.definition);
  const directoryPath = path.dirname(definitionPath);
  const imagePathsByPriority = [
    path.resolve(directoryPath, "images", `export_anim_${colorIndex}.gif`),
    path.resolve(directoryPath, "images", `anim_${colorIndex}.gif`),
    path.resolve(directoryPath, `stand${colorIndex}.gif`),
    path.resolve(directoryPath, "stand.gif")
  ];
  if (character.hasOwnProperty(propertyName)) {
    imagePathsByPriority.unshift(path.resolve(directoryPath, character[propertyName]));
    imagePathsByPriority.unshift(path.resolve(environment.currentDirectory, character[propertyName]));
    imagePathsByPriority.unshift(path.resolve(environment.currentDirectory, "chars", character[propertyName]));
  }

  for (const imagePath of imagePathsByPriority) {
    if (fs.existsSync(imagePath)) {
      return imagePath;
    }
  }

  return null;
}

import { remote } from "electron";
import useEnvironment from "../configuration/useEnvironment.hook";
import randomCharacter from "../assets/random-character.png";

const fs = remote.require("fs");
const path = remote.require("path");

const cache = new WeakMap();

export default function useCharacterThumbnail(character) {
  const environment = useEnvironment();

  if (!character) {
    return null;
  }

  if (cache.has(character)) {
    return cache.get(character);
  }

  if (character.random) {
    return randomCharacter;
  }

  const definitionPath = path.resolve(environment.currentDirectory, "chars", character.definition);
  const directoryPath = path.dirname(definitionPath);
  const imagePathsByPriority = [path.resolve(directoryPath, "thumbnail.png")];
  if (character.thumbnail) {
    imagePathsByPriority.push(path.resolve(directoryPath, character.thumbnail));
    imagePathsByPriority.push(path.resolve(environment.currentDirectory, character.thumbnail));
    imagePathsByPriority.push(path.resolve(environment.currentDirectory, "chars", character.thumbnail));
  }

  let foundImagePath;
  for (const imagePath of imagePathsByPriority) {
    if (fs.existsSync(imagePath)) {
      foundImagePath = imagePath;
      break;
    }
  }

  cache.set(character, foundImagePath);
  return foundImagePath;
}

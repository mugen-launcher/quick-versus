import useEnvironment from "../configuration/useEnvironment.hook";
import randomCharacter from "../assets/random-character.png";

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

  const definitionPath = mainAPI.resolve(environment.currentDirectory, "chars", character.definition);
  const directoryPath = mainAPI.dirname(definitionPath);
  const imagePathsByPriority = [mainAPI.resolve(directoryPath, "thumbnail.png")];
  if (character.thumbnail) {
    imagePathsByPriority.push(mainAPI.resolve(directoryPath, character.thumbnail));
    imagePathsByPriority.push(mainAPI.resolve(environment.currentDirectory, character.thumbnail));
    imagePathsByPriority.push(mainAPI.resolve(environment.currentDirectory, "chars", character.thumbnail));
  }

  let foundImagePath;
  for (const imagePath of imagePathsByPriority) {
    if (mainAPI.existsSync(imagePath)) {
      foundImagePath = imagePath;
      break;
    }
  }

  cache.set(character, foundImagePath);
  return foundImagePath;
}

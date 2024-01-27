import useEnvironment from "../configuration/useEnvironment.hook";

export default function useCharacterPortrait(character) {
  const environment = useEnvironment();

  if (!character) {
    return null;
  }

  if (character.random) {
    return null;
  }

  const definitionPath = mainAPI.resolve(environment.currentDirectory, "chars", character.definition);
  const directoryPath = mainAPI.dirname(definitionPath);
  const imagePathsByPriority = [mainAPI.resolve(directoryPath, "portrait.png")];
  if (character.portrait) {
    imagePathsByPriority.push(mainAPI.resolve(directoryPath, character.portrait));
    imagePathsByPriority.push(mainAPI.resolve(environment.currentDirectory, character.portrait));
    imagePathsByPriority.push(mainAPI.resolve(environment.currentDirectory, "chars", character.portrait));
  }

  for (const imagePath of imagePathsByPriority) {
    if (mainAPI.existsSync(imagePath)) {
      return imagePath;
    }
  }

  return null;
}

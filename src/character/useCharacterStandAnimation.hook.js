import useEnvironment from "../configuration/useEnvironment.hook";

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

  const definitionPath = mainAPI.resolve(environment.currentDirectory, "chars", character.definition);
  const directoryPath = mainAPI.dirname(definitionPath);
  const imagePathsByPriority = [
    mainAPI.resolve(directoryPath, "images", `export_anim_${colorIndex}.gif`),
    mainAPI.resolve(directoryPath, "images", `anim_${colorIndex}.gif`),
    mainAPI.resolve(directoryPath, `stand${colorIndex}.gif`),
    mainAPI.resolve(directoryPath, "stand.gif")
  ];
  if (character.hasOwnProperty(propertyName)) {
    imagePathsByPriority.unshift(mainAPI.resolve(directoryPath, character[propertyName]));
    imagePathsByPriority.unshift(mainAPI.resolve(environment.currentDirectory, character[propertyName]));
    imagePathsByPriority.unshift(mainAPI.resolve(environment.currentDirectory, "chars", character[propertyName]));
  }

  for (const imagePath of imagePathsByPriority) {
    if (mainAPI.existsSync(imagePath)) {
      return imagePath;
    }
  }

  return null;
}

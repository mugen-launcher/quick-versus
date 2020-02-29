import useConfiguration from "./useConfiguration.hook";

export default function useCharacterColumns() {
  const configuration = useConfiguration();

  if (!configuration.characterColumns) {
    return 1;
  }

  return configuration.characterColumns;
}

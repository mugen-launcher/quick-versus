import useConfiguration from "./useConfiguration.hook";

export default function useCategories() {
  const configuration = useConfiguration();

  if (!configuration.characterColumns) {
    return 1;
  }

  return configuration.characterColumns;
}

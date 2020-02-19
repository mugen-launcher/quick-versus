import useConfiguration from "./useConfiguration.hook";

export default function useCategories() {
  const configuration = useConfiguration();

  if (!Array.isArray(configuration.categories)) {
    return [];
  }

  return configuration.categories;
}

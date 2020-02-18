import useConfiguration from "./useConfiguration.hook";

export default function useCharacters() {
  const configuration = useConfiguration();

  if (!Array.isArray(configuration.categories)) {
    return [];
  }



  return categories;
}

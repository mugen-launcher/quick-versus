import useConfiguration from "./useConfiguration.hook";

export default function useCharacterNameOptions() {
  const configuration = useConfiguration();

  if (!configuration.characterNameOptions) {
    return {};
  }

  return configuration.characterNameOptions;
}

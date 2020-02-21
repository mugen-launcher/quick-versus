import useConfiguration from "./useConfiguration.hook";

export default function useStages() {
  const configuration = useConfiguration();

  if (!Array.isArray(configuration.stages)) {
    return [];
  }

  return configuration.stages;
}

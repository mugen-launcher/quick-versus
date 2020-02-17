import useConfiguration from "./useConfiguration.hook";

export default function useKeyboardMappingPlayerTwo() {
  const configuration = useConfiguration();

  if (!configuration.playerTwo || !configuration.playerTwo.keyboard) {
    throw new Error("Keyboard mapping not found for player two.");
  }

  return configuration.playerTwo.keyboard;
}

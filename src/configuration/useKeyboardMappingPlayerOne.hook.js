import useConfiguration from "./useConfiguration.hook";

export default function useKeyboardMappingPlayerOne() {
  const configuration = useConfiguration();

  if (!configuration.playerOne || !configuration.playerOne.keyboard) {
    throw new Error("Keyboard mapping not found for player one.");
  }

  return configuration.playerOne.keyboard;
}

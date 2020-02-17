import useConfiguration from "./useConfiguration.hook";

export default function useGamepadMappingPlayerOne() {
  const configuration = useConfiguration();

  if (!configuration.playerOne || !configuration.playerOne.gamepad) {
    throw new Error("Gamepad mapping not found for player one.");
  }

  return configuration.playerOne.gamepad;
}

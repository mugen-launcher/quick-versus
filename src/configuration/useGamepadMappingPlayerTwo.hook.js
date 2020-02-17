import useConfiguration from "./useConfiguration.hook";

export default function useGamepadMappingPlayerTwo() {
  const configuration = useConfiguration();

  if (!configuration.playerTwo || !configuration.playerTwo.gamepad) {
    throw new Error("Gamepad mapping not found for player two.");
  }

  return configuration.playerTwo.gamepad;
}

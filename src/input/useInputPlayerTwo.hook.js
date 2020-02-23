import useKeyboardMapping from "../configuration/useKeyboardMappingPlayerTwo.hook";
import useGamepadMapping from "../configuration/useGamepadMappingPlayerTwo.hook";
import useInput from "./useInput.hook";

export default function useInputPlayerOne() {
  const keyboardMapping = useKeyboardMapping();
  const gamepadMapping = useGamepadMapping();

  return useInput(keyboardMapping, gamepadMapping);
}

import useKeyboardMapping from "../configuration/useKeyboardMappingPlayerOne.hook";
import useGamepadMapping from "../configuration/useGamepadMappingPlayerOne.hook";
import useInput from "./useInput.hook";

export default function useInputPlayerOne() {
  const keyboardMapping = useKeyboardMapping();
  const gamepadMapping = useGamepadMapping();

  return useInput(keyboardMapping, gamepadMapping);
}

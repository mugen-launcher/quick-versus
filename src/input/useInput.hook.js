import { useEffect } from "react";
import useKeyboard from "./useKeyboard.hook";
import useGamepad from "./useGamepad.hook";

export default function useInputPlayerOne(keyboardMapping, gamepadMapping) {
  const emitter = new EventTarget();
  const keyboard = useKeyboard();
  const gamepad = useGamepad();

  useEffect(() => {
    const onPressLeft = () => {
      emitter.dispatchEvent(new Event("left"));
    };
    const onPressRight = () => {
      emitter.dispatchEvent(new Event("right"));
    };

    keyboard.addEventListener(keyboardMapping.left, onPressLeft);
    keyboard.addEventListener(keyboardMapping.right, onPressRight);
    gamepad.addEventListener(gamepadMapping.left, onPressLeft);
    gamepad.addEventListener(gamepadMapping.right, onPressRight);

    return () => {
      keyboard.removeEventListener(keyboardMapping.left, onPressLeft);
      keyboard.removeEventListener(keyboardMapping.right, onPressRight);
      gamepad.removeEventListener(gamepadMapping.left, onPressLeft);
      gamepad.removeEventListener(gamepadMapping.right, onPressRight);
    };
  }, [emitter, keyboardMapping, gamepadMapping, keyboard, gamepad]);

  return emitter;
}

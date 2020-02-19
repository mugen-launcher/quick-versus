import { useEffect, useRef } from "react";
import useKeyboard from "./useKeyboard.hook";
import useGamepad from "./useGamepad.hook";

export default function useInput(keyboardMapping, gamepadMapping) {
  const emitterRef = useRef(new EventTarget());
  const emitter = emitterRef.current;
  const keyboard = useKeyboard();
  const gamepad = useGamepad();

  useEffect(() => {
    const onPressLeft = () => {
      emitter.dispatchEvent(new Event("left"));
    };
    const onPressRight = () => {
      emitter.dispatchEvent(new Event("right"));
    };
    const onPressUp = () => {
      emitter.dispatchEvent(new Event("up"));
    };
    const onPressDown = () => {
      emitter.dispatchEvent(new Event("down"));
    };
    const onPressA = () => {
      emitter.dispatchEvent(new Event("a"));
    };
    const onPressB = () => {
      emitter.dispatchEvent(new Event("b"));
    };
    const onPressC = () => {
      emitter.dispatchEvent(new Event("c"));
    };
    const onPressX = () => {
      emitter.dispatchEvent(new Event("x"));
    };
    const onPressY = () => {
      emitter.dispatchEvent(new Event("y"));
    };
    const onPressZ = () => {
      emitter.dispatchEvent(new Event("z"));
    };
    const onPressEscape = () => {
      emitter.dispatchEvent(new Event("escape"));
    };
    const onPressEnter = () => {
      emitter.dispatchEvent(new Event("enter"));
    };

    keyboard.addEventListener(keyboardMapping.left, onPressLeft);
    keyboard.addEventListener(keyboardMapping.right, onPressRight);
    keyboard.addEventListener(keyboardMapping.up, onPressUp);
    keyboard.addEventListener(keyboardMapping.down, onPressDown);
    keyboard.addEventListener(keyboardMapping.a, onPressA);
    keyboard.addEventListener(keyboardMapping.b, onPressB);
    keyboard.addEventListener(keyboardMapping.c, onPressC);
    keyboard.addEventListener(keyboardMapping.x, onPressX);
    keyboard.addEventListener(keyboardMapping.y, onPressY);
    keyboard.addEventListener(keyboardMapping.z, onPressZ);
    keyboard.addEventListener(keyboardMapping.escape, onPressEscape);
    keyboard.addEventListener(keyboardMapping.enter, onPressEnter);
    gamepad.addEventListener(gamepadMapping.left, onPressLeft);
    gamepad.addEventListener(gamepadMapping.right, onPressRight);
    gamepad.addEventListener(keyboardMapping.up, onPressUp);
    gamepad.addEventListener(keyboardMapping.down, onPressDown);
    gamepad.addEventListener(keyboardMapping.a, onPressA);
    gamepad.addEventListener(keyboardMapping.b, onPressB);
    gamepad.addEventListener(keyboardMapping.c, onPressC);
    gamepad.addEventListener(keyboardMapping.x, onPressX);
    gamepad.addEventListener(keyboardMapping.y, onPressY);
    gamepad.addEventListener(keyboardMapping.z, onPressZ);
    gamepad.addEventListener(keyboardMapping.escape, onPressEscape);
    gamepad.addEventListener(keyboardMapping.enter, onPressEnter);

    return () => {
      keyboard.removeEventListener(keyboardMapping.left, onPressLeft);
      keyboard.removeEventListener(keyboardMapping.right, onPressRight);
      keyboard.removeEventListener(keyboardMapping.up, onPressUp);
      keyboard.removeEventListener(keyboardMapping.down, onPressDown);
      keyboard.removeEventListener(keyboardMapping.a, onPressA);
      keyboard.removeEventListener(keyboardMapping.b, onPressB);
      keyboard.removeEventListener(keyboardMapping.c, onPressC);
      keyboard.removeEventListener(keyboardMapping.x, onPressX);
      keyboard.removeEventListener(keyboardMapping.y, onPressY);
      keyboard.removeEventListener(keyboardMapping.z, onPressZ);
      keyboard.removeEventListener(keyboardMapping.escape, onPressEscape);
      keyboard.removeEventListener(keyboardMapping.enter, onPressEnter);
      gamepad.removeEventListener(gamepadMapping.left, onPressLeft);
      gamepad.removeEventListener(gamepadMapping.right, onPressRight);
      gamepad.removeEventListener(keyboardMapping.up, onPressUp);
      gamepad.removeEventListener(keyboardMapping.down, onPressDown);
      gamepad.removeEventListener(keyboardMapping.a, onPressA);
      gamepad.removeEventListener(keyboardMapping.b, onPressB);
      gamepad.removeEventListener(keyboardMapping.c, onPressC);
      gamepad.removeEventListener(keyboardMapping.x, onPressX);
      gamepad.removeEventListener(keyboardMapping.y, onPressY);
      gamepad.removeEventListener(keyboardMapping.z, onPressZ);
      gamepad.removeEventListener(keyboardMapping.escape, onPressEscape);
      gamepad.removeEventListener(keyboardMapping.enter, onPressEnter);
    };
  }, [emitter, keyboardMapping, gamepadMapping, keyboard, gamepad]);

  return emitter;
}

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
      emitter.dispatchEvent(new Event("*"));
    };
    const onPressRight = () => {
      emitter.dispatchEvent(new Event("right"));
      emitter.dispatchEvent(new Event("*"));
    };
    const onPressUp = () => {
      emitter.dispatchEvent(new Event("up"));
      emitter.dispatchEvent(new Event("*"));
    };
    const onPressDown = () => {
      emitter.dispatchEvent(new Event("down"));
      emitter.dispatchEvent(new Event("*"));
    };
    const onPressA = () => {
      emitter.dispatchEvent(new Event("a"));
      emitter.dispatchEvent(new Event("*"));
    };
    const onPressB = () => {
      emitter.dispatchEvent(new Event("b"));
      emitter.dispatchEvent(new Event("*"));
    };
    const onPressC = () => {
      emitter.dispatchEvent(new Event("c"));
      emitter.dispatchEvent(new Event("*"));
    };
    const onPressX = () => {
      emitter.dispatchEvent(new Event("x"));
      emitter.dispatchEvent(new Event("*"));
    };
    const onPressY = () => {
      emitter.dispatchEvent(new Event("y"));
      emitter.dispatchEvent(new Event("*"));
    };
    const onPressZ = () => {
      emitter.dispatchEvent(new Event("z"));
      emitter.dispatchEvent(new Event("*"));
    };
    const onPressEscape = () => {
      emitter.dispatchEvent(new Event("escape"));
      emitter.dispatchEvent(new Event("*"));
    };
    const onPressEnter = () => {
      emitter.dispatchEvent(new Event("enter"));
      emitter.dispatchEvent(new Event("*"));
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
    gamepad.addEventListener(gamepadMapping.up, onPressUp);
    gamepad.addEventListener(gamepadMapping.down, onPressDown);
    gamepad.addEventListener(gamepadMapping.a, onPressA);
    gamepad.addEventListener(gamepadMapping.b, onPressB);
    gamepad.addEventListener(gamepadMapping.c, onPressC);
    gamepad.addEventListener(gamepadMapping.x, onPressX);
    gamepad.addEventListener(gamepadMapping.y, onPressY);
    gamepad.addEventListener(gamepadMapping.z, onPressZ);
    gamepad.addEventListener(gamepadMapping.escape, onPressEscape);
    gamepad.addEventListener(gamepadMapping.enter, onPressEnter);

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
      gamepad.removeEventListener(gamepadMapping.up, onPressUp);
      gamepad.removeEventListener(gamepadMapping.down, onPressDown);
      gamepad.removeEventListener(gamepadMapping.a, onPressA);
      gamepad.removeEventListener(gamepadMapping.b, onPressB);
      gamepad.removeEventListener(gamepadMapping.c, onPressC);
      gamepad.removeEventListener(gamepadMapping.x, onPressX);
      gamepad.removeEventListener(gamepadMapping.y, onPressY);
      gamepad.removeEventListener(gamepadMapping.z, onPressZ);
      gamepad.removeEventListener(gamepadMapping.escape, onPressEscape);
      gamepad.removeEventListener(gamepadMapping.enter, onPressEnter);
    };
  }, [emitter, keyboardMapping, gamepadMapping, keyboard, gamepad]);

  return emitter;
}

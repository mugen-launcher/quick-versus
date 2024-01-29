import { useEffect, useRef } from "react";
import useKeyboard from "./useKeyboard.hook";
import useGamepad from "./useGamepad.hook";
import { UP, DOWN, LEFT, RIGHT, A, B, X, Y, L1, R1, QUIT } from "./event";

export default function useInput(keyboardMapping, gamepadMapping) {
  const emitterRef = useRef(new EventTarget());
  const emitter = emitterRef.current;
  const keyboard = useKeyboard();
  const gamepad = useGamepad();

  useEffect(() => {
    const onPressLeft = () => {
      emitter.dispatchEvent(new Event(LEFT));
      emitter.dispatchEvent(new Event("*"));
    };
    const onPressRight = () => {
      emitter.dispatchEvent(new Event(RIGHT));
      emitter.dispatchEvent(new Event("*"));
    };
    const onPressUp = () => {
      emitter.dispatchEvent(new Event(UP));
      emitter.dispatchEvent(new Event("*"));
    };
    const onPressDown = () => {
      emitter.dispatchEvent(new Event(DOWN));
      emitter.dispatchEvent(new Event("*"));
    };
    const onPressA = () => {
      emitter.dispatchEvent(new Event(A));
      emitter.dispatchEvent(new Event("*"));
    };
    const onPressB = () => {
      emitter.dispatchEvent(new Event(B));
      emitter.dispatchEvent(new Event("*"));
    };
    const onPressX = () => {
      emitter.dispatchEvent(new Event(X));
      emitter.dispatchEvent(new Event("*"));
    };
    const onPressY = () => {
      emitter.dispatchEvent(new Event(Y));
      emitter.dispatchEvent(new Event("*"));
    };
    const onPressL1 = () => {
      emitter.dispatchEvent(new Event(L1));
      emitter.dispatchEvent(new Event("*"));
    };
    const onPressR1 = () => {
      emitter.dispatchEvent(new Event(R1));
      emitter.dispatchEvent(new Event("*"));
    };
    const onPressQuit = () => {
      console.log("onPressQuit " + QUIT);
      emitter.dispatchEvent(new Event(QUIT));
      emitter.dispatchEvent(new Event("*"));
    };

    keyboard.addEventListener(keyboardMapping.left, onPressLeft);
    keyboard.addEventListener(keyboardMapping.right, onPressRight);
    keyboard.addEventListener(keyboardMapping.up, onPressUp);
    keyboard.addEventListener(keyboardMapping.down, onPressDown);
    keyboard.addEventListener(keyboardMapping.a, onPressA);
    keyboard.addEventListener(keyboardMapping.b, onPressB);
    keyboard.addEventListener(keyboardMapping.x, onPressX);
    keyboard.addEventListener(keyboardMapping.y, onPressY);
    keyboard.addEventListener(keyboardMapping.l1, onPressL1);
    keyboard.addEventListener(keyboardMapping.r1, onPressR1);
    keyboard.addEventListener(keyboardMapping.quit, onPressQuit);
    /*
    gamepad.addEventListener(gamepadMapping.left, onPressLeft);
    gamepad.addEventListener(gamepadMapping.right, onPressRight);
    gamepad.addEventListener(gamepadMapping.up, onPressUp);
    gamepad.addEventListener(gamepadMapping.down, onPressDown);
    gamepad.addEventListener(gamepadMapping.a, onPressA);
    gamepad.addEventListener(gamepadMapping.b, onPressB);
    gamepad.addEventListener(gamepadMapping.x, onPressX);
    gamepad.addEventListener(gamepadMapping.y, onPressY);
    gamepad.addEventListener(gamepadMapping.l1, onPressL1);
    gamepad.addEventListener(gamepadMapping.r1, onPressR1);
    gamepad.addEventListener(gamepadMapping.quit, onPressQuit);
    */

    return () => {
      keyboard.removeEventListener(keyboardMapping.left, onPressLeft);
      keyboard.removeEventListener(keyboardMapping.right, onPressRight);
      keyboard.removeEventListener(keyboardMapping.up, onPressUp);
      keyboard.removeEventListener(keyboardMapping.down, onPressDown);
      keyboard.removeEventListener(keyboardMapping.a, onPressA);
      keyboard.removeEventListener(keyboardMapping.b, onPressB);
      keyboard.removeEventListener(keyboardMapping.x, onPressX);
      keyboard.removeEventListener(keyboardMapping.y, onPressY);
      keyboard.removeEventListener(keyboardMapping.l1, onPressL1);
      keyboard.removeEventListener(keyboardMapping.r1, onPressR1);
      keyboard.removeEventListener(keyboardMapping.quit, onPressQuit);
      /*
      gamepad.removeEventListener(gamepadMapping.left, onPressLeft);
      gamepad.removeEventListener(gamepadMapping.right, onPressRight);
      gamepad.removeEventListener(gamepadMapping.up, onPressUp);
      gamepad.removeEventListener(gamepadMapping.down, onPressDown);
      gamepad.removeEventListener(gamepadMapping.a, onPressA);
      gamepad.removeEventListener(gamepadMapping.b, onPressB);
      gamepad.removeEventListener(gamepadMapping.x, onPressX);
      gamepad.removeEventListener(gamepadMapping.y, onPressY);
      gamepad.removeEventListener(gamepadMapping.l1, onPressL1);
      gamepad.removeEventListener(gamepadMapping.r1, onPressR1);
      gamepad.removeEventListener(gamepadMapping.quit, onPressQuit);
      */
    };
  }, [emitter, keyboardMapping, gamepadMapping, keyboard, gamepad]);

  return emitter;
}

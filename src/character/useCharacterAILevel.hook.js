import { useState, useEffect } from "react";
import useMoveCursorSound from "../configuration/useMoveCursorSound.hook";
import { DOWN, UP } from "../input/event";

export default function useCharacterAILevel(input, initialLevel = 0) {
  const moveCursorSound = useMoveCursorSound();
  const [level, setLevel] = useState(initialLevel);

  useEffect(() => {
    const decreaseLevel = () => {
      if (level > 0) {
        setLevel(level - 1);
      } else {
        setLevel(9);
      }
      moveCursorSound.play();
    };
    const increaseLevel = () => {
      setLevel((level + 1) % 10);
      moveCursorSound.play();
    };

    input.addEventListener(UP, decreaseLevel);
    input.addEventListener(DOWN, increaseLevel);

    return () => {
      input.removeEventListener(UP, decreaseLevel);
      input.removeEventListener(DOWN, increaseLevel);
    };
  }, [input, level, moveCursorSound]);

  return level;
}

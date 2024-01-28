import { useState, useEffect } from "react";
import useMoveCursorSound from "../configuration/useMoveCursorSound.hook";
import { DOWN, UP } from "../input/event";

export default function useCharacterColorIndex(input, total, initialIndex = 1) {
  const moveCursorSound = useMoveCursorSound();
  const [index, setIndex] = useState(initialIndex);

  let currentIndex = index;
  if (currentIndex > total) {
    currentIndex = 1;
  }

  useEffect(() => {
    const decreaseIndex = () => {
      if (currentIndex > 1) {
        setIndex(currentIndex - 1);
      } else {
        setIndex(total);
      }
      moveCursorSound.play();
    };
    const increaseIndex = () => {
      setIndex((currentIndex % total) + 1);
      moveCursorSound.play();
    };

    input.addEventListener(UP, decreaseIndex);
    input.addEventListener(DOWN, increaseIndex);

    return () => {
      input.removeEventListener(UP, decreaseIndex);
      input.removeEventListener(DOWN, increaseIndex);
    };
  }, [input, total, currentIndex, moveCursorSound]);

  return currentIndex;
}

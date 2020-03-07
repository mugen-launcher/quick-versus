import { useState, useEffect } from "react";
import useMoveCursorSound from "../configuration/useMoveCursorSound.hook";

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

    input.addEventListener("up", decreaseIndex);
    input.addEventListener("down", increaseIndex);

    return () => {
      input.removeEventListener("up", decreaseIndex);
      input.removeEventListener("down", increaseIndex);
    };
  }, [input, total, currentIndex, moveCursorSound]);

  return currentIndex;
}

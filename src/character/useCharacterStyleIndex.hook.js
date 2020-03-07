import { useState, useEffect } from "react";
import useMoveCursorSound from "../configuration/useMoveCursorSound.hook";

export default function useCharacterStyleIndex(input, total, initialIndex = 0) {
  const moveCursorSound = useMoveCursorSound();
  const [index, setIndex] = useState(initialIndex);

  let currentIndex = index;
  if (currentIndex > total) {
    currentIndex = 0;
  }

  useEffect(() => {
    const decreaseIndex = () => {
      if (currentIndex > 0) {
        setIndex(currentIndex - 1);
      } else {
        setIndex(total - 1);
      }
      moveCursorSound.play();
    };
    const increaseIndex = () => {
      setIndex((currentIndex + 1) % total);
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

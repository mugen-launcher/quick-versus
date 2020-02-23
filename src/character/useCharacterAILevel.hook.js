import { useState, useEffect } from "react";

export default function useCharacterAILevel(input, initialLevel = 0) {
  const [level, setLevel] = useState(initialLevel);

  useEffect(() => {
    const decreaseLevel = () => {
      if (level > 0) {
        setLevel(level - 1);
      } else {
        setLevel(9);
      }
    };
    const increaseLevel = () => {
      setLevel((level + 1) % 10);
    };

    input.addEventListener("up", decreaseLevel);
    input.addEventListener("down", increaseLevel);

    return () => {
      input.removeEventListener("up", decreaseLevel);
      input.removeEventListener("down", increaseLevel);
    };
  }, [input, level]);

  return level;
}

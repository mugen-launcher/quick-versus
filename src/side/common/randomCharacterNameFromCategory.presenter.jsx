import React, { useRef, useEffect } from "react";
import useSelectableCharacterNamesFromCategory from "../../character/useSelectableCharacterNamesFromCategory.hook";

export default function RandomCharacterNameFromCategory({ category }) {
  const display = useRef();
  const names = useSelectableCharacterNamesFromCategory(category);

  useEffect(() => {
    let requestId;
    const chooseRandomName = () => {
      const name = names[Math.floor(Math.random() * names.length)];
      display.current.innerHTML = name;

      requestId = window.requestAnimationFrame(chooseRandomName);
    };

    chooseRandomName();

    return () => {
      window.cancelAnimationFrame(requestId);
    };
  }, [names]);

  return <span ref={display} />;
}

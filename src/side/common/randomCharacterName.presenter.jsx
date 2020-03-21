import React, { useRef, useEffect } from "react";
import useSelectableCharactersNames from "../../character/useSelectableCharacterNames.hook";

export default function RandomCharacterName() {
  const display = useRef();
  const names = useSelectableCharactersNames();

  useEffect(() => {
    console.log("Total characters: ", names.length);

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

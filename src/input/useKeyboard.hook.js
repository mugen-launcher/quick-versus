import { useEffect } from "react";

const emitter = new EventTarget();

export default function useKeyboard() {
  useEffect(() => {
    const onKeyUp = event => {
      emitter.dispatchEvent(new Event(event.key));
    };

    document.addEventListener("keyup", onKeyUp);

    return () => {
      document.removeEventListener("keyup", onKeyUp);
    };
  });

  return emitter;
};

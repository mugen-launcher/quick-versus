const React = require("react");
const { useEffect, useState } = React;

const emitter = new EventTarget();

module.exports = function useKeyboard() {
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

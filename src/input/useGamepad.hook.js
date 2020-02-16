const React = require("react");
const { useState, useEffect } = React;

const emitter = new EventTarget();
let currentButtonStates = [];
function scanGamepads() {
  const gamepads = navigator.getGamepads();
  const nextButtonStates = Array.from(gamepads)
    .filter(gamepad => {
      if (gamepad) {
        return true;
      }
    })
    .map(gamepad => {
      return gamepad.buttons.map(button => {
        return button.pressed;
      });
    });

  nextButtonStates.forEach((buttons, gamepadIndex) => {
    buttons.forEach((buttonPressed, buttonIndex) => {
      if (!buttonPressed) {
        return;
      }
      if (!currentButtonStates[gamepadIndex] || !currentButtonStates[gamepadIndex][buttonIndex]) {
        console.log("Gamepad", gamepadIndex, "Button", buttonIndex);
        emitter.dispatchEvent(new Event(`${gamepadIndex}-${buttonIndex}`));
      }
    });
  });

  currentButtonStates = nextButtonStates;
  window.requestAnimationFrame(scanGamepads);
};
scanGamepads();

module.exports = function useGamepads() {
  return emitter;
};

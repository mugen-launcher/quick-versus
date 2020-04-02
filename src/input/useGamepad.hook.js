import { useEffect } from "react";

function gamepadFilter(gamepad) {
  if (gamepad) {
    return true;
  }

  return false;
}

export default function useGamepads() {
  const emitter = new EventTarget();

  useEffect(() => {
    let currentButtonStates = [];
    const scanGamepads = () => {
      try {
        const gamepads = navigator.getGamepads();
        const nextButtonStates = Array.from(gamepads)
          .filter(gamepadFilter)
          .map(gamepad => {
            const buttons = gamepad.buttons.map(button => {
              return button.pressed;
            });
            if (Array.isArray(gamepad.axes)) {
              for (let axeIndex = 0; axeIndex < gamepad.axes.length && axeIndex < 9; axeIndex++) {
                const axe = gamepad.axes[axeIndex];
                const value = Math.round(axe);
                buttons.push(value === -1);
                buttons.push(value === 1);
              }

              /*
              For some gamepad with 10 axes, the 10th value (I don't know why):
              - up: -1
              - up left: 1
              - up right: -0.7142857313156128
              - left: 0.7142857313156128
              - down left: 0.4285714626312256
              - down: 0.14285719394683838
              - down right: -0.1428571343421936
              - right: -0.4285714030265808
              */
              if (gamepad.axes.length >= 10) {
                const value = gamepad.axes[9];
                // up
                buttons.push(value === -1 || value === 1 || value === -0.7142857313156128);

                // left
                buttons.push(value === 0.7142857313156128 || value === 1 || value === 0.4285714626312256);

                // down
                buttons.push(
                  value === 0.14285719394683838 || value === 0.4285714626312256 || value === -0.1428571343421936
                );

                // right
                buttons.push(
                  value === -0.4285714030265808 || value === -0.7142857313156128 || value === -0.1428571343421936
                );
              }
            }

            return buttons;
          });

        nextButtonStates.forEach((buttons, gamepadIndex) => {
          buttons.forEach((buttonPressed, buttonIndex) => {
            if (!buttonPressed) {
              return;
            }
            if (!currentButtonStates[gamepadIndex] || !currentButtonStates[gamepadIndex][buttonIndex]) {
              const code = String.fromCharCode(65 + gamepadIndex) + buttonIndex;
              // console.log("Gamepad", code);
              emitter.dispatchEvent(new Event(code));
              emitter.dispatchEvent(new CustomEvent("button", { detail: code }));
            }
          });
        });

        currentButtonStates = nextButtonStates;
      } catch (error) {
        console.error(error);
      }
      window.requestAnimationFrame(scanGamepads);
    };
    scanGamepads();
  }, [emitter]);

  return emitter;
}

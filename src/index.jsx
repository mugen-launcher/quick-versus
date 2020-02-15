const React = require("react");
const { render } = require("react-dom");
const Style = require("./style.css");
const App = require("./App");

render(<App />, document.getElementById("app"));

/*
const controllers = {};
function scanGamepads () {
  var gamepads = navigator.getGamepads();

  Array.from(gamepads).forEach(gamepad => {
    if (gamepad) {
      controllers[gamepad.index] = gamepad;
    }
  });

  window.requestAnimationFrame(scanGamepads)
}

scanGamepads()
*/

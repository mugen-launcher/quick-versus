const React = require("react");
const { createContext } = React;
const remote = require("electron").remote;
const app = remote.app;
const fs = remote.require("fs");
const path = remote.require("path");
const execFile = remote.require("child_process").execFile;
const isDev = require("electron-is-dev");
const ConfigurationContext = require("./utils/configuration.context");
const CategorySelectorPlayerOne = require("./category/categorySelectorPlayerOne.presenter");
const CategorySelectorPlayerTwo = require("./category/categorySelectorPlayerTwo.presenter");

let currentDirectory;
if (isDev) {
  currentDirectory = path.resolve(app.getAppPath(), "dev");
} else {
  currentDirectory = remote.process.env.PORTABLE_EXECUTABLE_DIR;
}

module.exports = function App() {
  if (!currentDirectory) {
    return (
      <div class="requirement-message">
        <p>No current directory</p>
      </div>
    );
  }

  const configurationFilePath = path.resolve(currentDirectory, "quick-versus.json");
  if (!fs.existsSync(configurationFilePath)) {
    return (
      <div class="requirement-message">
        <p>Configuration file is missing: {configurationFilePath}</p>
      </div>
    );
  }

  const mugenPath = path.resolve(currentDirectory, "mugen.exe");
  if (!fs.existsSync(mugenPath)) {
    return (
      <div class="requirement-message">
        <p>Mugen executable file is missing: {mugenPath}</p>
      </div>
    );
  }

  const configurationContent = fs.readFileSync(configurationFilePath);
  let configuration;
  try {
    configuration = JSON.parse(configurationContent);
  } catch(error) {
    return (
      <div class="fatal-error">
        <p>Invalid configuration file:</p>
        <p>{configurationFilePath}</p>
        <p>{error.message}</p>
      </div>
    );
  }

  /*
  const files = fs.readdirSync(currentDirectory);
  files.forEach((file, index) => {
    console.log(file);
  });
  */

  /*
  const mugenPath = path.resolve(currentDirectory, "mugen.exe");
  execFile(mugenPath, [], { cwd: currentDirectory, windowsHide: true }, function(err, data) {
    console.log("ok")
  });
  */

  //const imagePath = `${currentDirectory}/test.png`;
  /*
  const p = [];
  for (const index in gamepads) {
    const gamepad = gamepads[index];
    const buttons = gamepad.buttons;
    const b = [];
    for (const button of buttons) {
      b.push(<li>{button.value}: {button.pressed ? "Pressed" : "Released"}</li>);
    }

    p.push(<ul key={gamepad.index}>
      <li>Index {gamepad.index}</li>
      <li>
        Buttons
        <ul>
          {b}
        </ul>
      </li>
    </ul>
    );
  }
  */

  return (
    <ConfigurationContext.Provider value={configuration}>
      <div class="app">
        <div class="player-1 category-selector">
          <CategorySelectorPlayerOne/>
        </div>
        <div class="player-2 category-selector">
          <CategorySelectorPlayerTwo/>
        </div>
      </div>
    </ConfigurationContext.Provider>
  );
}

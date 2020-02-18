import React from "react";
import { remote } from "electron";
import isDev from "electron-is-dev";
import ConfigurationContext from "./configuration/configuration.context";
import EnvironmentContext from "./configuration/environment.context";
import CategorySelectorPlayerTwo from "./category/categorySelectorPlayerTwo.presenter";
import PlayerOne from "./player/playerOne.presenter";
import ErrorBoundary from "./error/errorBoundary.view";
const app = remote.app;
const fs = remote.require("fs");
const path = remote.require("path");
const execFile = remote.require("child_process").execFile;

let currentDirectory;
if (isDev) {
  currentDirectory = path.resolve(app.getAppPath(), "dev-env");
} else {
  currentDirectory = remote.process.env.PORTABLE_EXECUTABLE_DIR;
}

export default function App() {
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

  const environment = {
    app,
    currentDirectory,
    mugenPath,
    configurationFilePath,
    isDev
  };

  return (
    <ErrorBoundary>

    <EnvironmentContext.Provider value={environment}>
      <ConfigurationContext.Provider value={configuration}>
        <div class="app">
          <div class="player-1 category-selector">
            <PlayerOne />
          </div>
          <div class="player-2 category-selector">
            <CategorySelectorPlayerTwo/>
          </div>

          <div class="player-1 character-selector">

          </div>
          <div class="player-2 character-selector">

          </div>
        </div>
      </ConfigurationContext.Provider>
    </EnvironmentContext.Provider>
    </ErrorBoundary>
  );
}

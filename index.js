const util = require("node:util");
const exec = util.promisify(require("node:child_process").exec);
const { app, BrowserWindow, ipcMain } = require("electron");
const path = require("path");
const fs = require("fs");
const configYaml = require("config-yaml");
const isDev = process.env.DEV;
const version = process.env.npm_package_version;

// Enable auto-reload in development if set
try {
  if (isDev && process.env.AUTO_RELOAD) require('electron-reloader')(module);
} catch {}

function getCurrentDirectory() {
  let currentDirectory;
  if (process.argv.length >= 3) {
    // TODO use a named option
    currentDirectory = path.normalize(process.argv[2]);
  } else if (isDev) {
    currentDirectory = path.resolve(app.getAppPath(), "dev-env");
  } else if (process.env.PORTABLE_EXECUTABLE_DIR) {
    currentDirectory = process.env.PORTABLE_EXECUTABLE_DIR;
  } else if (process.env.INIT_CWD) {
    currentDirectory = process.env.INIT_CWD;
  } else if (app.getPath("exe")) {
    currentDirectory = path.dirname(app.getPath("exe"));
  } else if (process.execPath) {
    currentDirectory = process.execPath;
  }
  if (path.basename(currentDirectory) === "MacOS") {
    currentDirectory = path.resolve(currentDirectory, "..", "..", "..");
  }

  return currentDirectory;
}

function getConfiguration() {
  const currentDirectory = getCurrentDirectory();
  const jsonFilePath = path.resolve(currentDirectory, "quick-versus.json");
  const yamlFilePath = path.resolve(currentDirectory, "quick-versus.yml");
  let config;
  if (fs.existsSync(jsonFilePath)) {
    config = require(jsonFilePath);
  } else if (fs.existsSync(yamlFilePath)) {
    config = configYaml(yamlFilePath);
  }

  return config;
}

function createWindow() {
  let width = 1024;
  let height = 576;
  let fullscreen = false;
  let frame = false;

  try {
    const config = getConfiguration();

    if (config) {
      if (config.hasOwnProperty("width")) {
        width = config.width;
      }

      if (config.hasOwnProperty("height")) {
        height = config.height;
      }

      if (config.hasOwnProperty("fullscreen")) {
        fullscreen = config.fullscreen;
      }

      if (config.hasOwnProperty("frame")) {
        frame = config.frame;
      }
    }
  } catch (error) {
    // No override
  }

  const window = new BrowserWindow({
    title: "Quick Versus Launcher",
    backgroundColor: "#333333",
    frame,
    width,
    height,
    fullscreen,
    webPreferences: {
      preload: path.join(__dirname, "preload.js"),
      nodeIntegration: true,
      enableRemoteModule: true
    },
    webSecurity: false
  });
  window.loadFile("build/index.html");
  //window.webContents.openDevTools();

  return window;
}

app.on("window-all-closed", () => {
  app.quit();
});

function getVersion(event) {
  event.returnValue = version;
}

async function launchGame(event, options) {
  const directoryPath = getCurrentDirectory();
  const filePath = `${directoryPath}/.engine/run-ikemen.sh`;
  const config = getConfiguration();

  let command = `"${filePath}"`;
  if (config.rounds) {
    command += ` -rounds="${config.rounds}"`;
  }
  if (config.motif) {
    command += ` -motif="${config.motif}"`;
  }
  if (config.lifebar) {
    command += ` -lifebar="${config.lifebar}"`;
  }
  if (options.characterOne) {
    command += ` -p1="${options.characterOne}"`;
  }
  if (options.characterOneColorIndex) {
    command += ` -p1.color="${options.characterOneColorIndex}"`;
  }
  if (options.characterTwo) {
    command += ` -p2="${options.characterTwo}"`;
  }
  if (options.characterTwoColorIndex) {
    command += ` -p2.color="${options.characterTwoColorIndex}"`;
  }
  if (options.characterTwoAILevel) {
    command += ` -p2.ai="${options.characterTwoAILevel}"`;
  }
  if (options.stage) {
    command += ` -s="${options.stage}"`;
  }
  console.log(command);
  await exec(command, { cwd: directoryPath });
  return true;
}

function getConfigYaml(event, filePath) {
  event.returnValue = configYaml(filePath);
}

function existsSync(event, filePath) {
  event.returnValue = fs.existsSync(filePath);
}

function readFileSync(event, filePath) {
  event.returnValue = fs.readFileSync(filePath, "utf-8");
}

function resolve(event, args) {
  event.returnValue = path.resolve.apply(this, args);
}

function dirname(event, filePath) {
  event.returnValue = path.dirname(filePath);
}

function getCurrentDirectoryExported(event) {
  event.returnValue = getCurrentDirectory();
}

async function start() {
  await app.whenReady();
  ipcMain.on("getVersion", getVersion);
  ipcMain.handle("launchGame", launchGame);
  ipcMain.on("existsSync", existsSync);
  ipcMain.on("readFileSync", readFileSync);
  ipcMain.on("resolve", resolve);
  ipcMain.on("dirname", dirname);
  ipcMain.on("configYaml", getConfigYaml);
  ipcMain.on("getCurrentDirectory", getCurrentDirectoryExported);
  const window = createWindow();
  ipcMain.handle("minimize", () => window.minimize());
  ipcMain.handle("restore", () => window.restore());
  ipcMain.handle("quit", () => window.close());
}
start();

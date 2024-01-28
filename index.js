const { execFile } = require("node:child_process");
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

function createWindow() {
  let width = 1024;
  let height = 576;
  let fullscreen = false;
  let frame = false;

  try {
    const currentDirectory = getCurrentDirectory();
    const jsonFilePath = path.resolve(currentDirectory, "quick-versus.json");
    const yamlFilePath = path.resolve(currentDirectory, "quick-versus.yml");
    let config;
    if (fs.existsSync(jsonFilePath)) {
      config = require(jsonFilePath);
    } else if (fs.existsSync(yamlFilePath)) {
      config = configYaml(yamlFilePath);
    }

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

async function executeFile (event, filePath, args, options) {
  execFile(filePath, args, options, () => {
    event.returnValue = true;
  });
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
  ipcMain.on("execFile", executeFile);
  ipcMain.on("existsSync", existsSync);
  ipcMain.on("readFileSync", readFileSync);
  ipcMain.on("resolve", resolve);
  ipcMain.on("dirname", dirname);
  ipcMain.on("configYaml", getConfigYaml);
  ipcMain.on("getCurrentDirectory", getCurrentDirectoryExported);
  const window = createWindow();
  ipcMain.handle("minimize", () => window.minimize());
  ipcMain.handle("restore", () => window.restore());
}
start();

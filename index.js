const { app, BrowserWindow } = require("electron");
const path = require("path");
const fs = require("fs");
const isDev = require("electron-is-dev");

function getCurrentDirectory() {
  let currentDirectory;
  if (process.argv.length >= 3) {
    currentDirectory = path.normalize(process.argv[2]);
  } else if (isDev) {
    currentDirectory = path.resolve(app.getAppPath(), "dev-env");
  } else {
    if (process.env.PORTABLE_EXECUTABLE_DIR) {
      currentDirectory = process.env.PORTABLE_EXECUTABLE_DIR;
    } else if (process.env.INIT_CWD) {
      currentDirectory = process.env.INIT_CWD;
    } else if (app.getPath("exe")) {
      currentDirectory = path.dirname(app.getPath("exe"));
    } else if (process.execPath) {
      currentDirectory = process.execPath;
    }
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
    const configurationFilePath = path.resolve(currentDirectory, "quick-versus.json");
    if (fs.existsSync(configurationFilePath)) {
      const config = require(configurationFilePath);

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
  } catch(error) {
    // No override
  }

  const window = new BrowserWindow({
    backgroundColor: "#333333",
    frame,
    width,
    height,
    fullscreen,
    webPreferences: {
      nodeIntegration: true,
      enableRemoteModule: true
    },
    webSecurity: false
  });
  window.loadFile("build/index.html");
  //window.webContents.openDevTools();
}

app.on("window-all-closed", () => {
  app.quit();
});

async function start() {
  await app.whenReady();
  createWindow();
}
start();

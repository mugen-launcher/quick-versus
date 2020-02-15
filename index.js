const { app, BrowserWindow } = require("electron");
const path = require("path");

function createWindow() {
  const window = new BrowserWindow({
    backgroundColor: "#333333",
    frame: false,
    fullscreen: true,
    webPreferences: {
      //nodeIntegration: true
    }
  });

  window.loadFile("build/index.html");

  window.webContents.openDevTools();
}

app.on("window-all-closed", () => {
  app.quit();
});

async function start() {
  await app.whenReady();
  createWindow();
}
start();

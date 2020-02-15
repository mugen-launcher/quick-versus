const { app, BrowserWindow } = require("electron");

function createWindow() {
  const window = new BrowserWindow({
    BackgroundColor: "#333",
    frame: false,
    fullscreen: true,
    webPreferences: {
      nodeIntegration: true
    }
  });

  window.loadFile("build/index.html");
}

app.on("window-all-closed", () => {
  app.quit();
});

async function start() {
  await app.whenReady();
  createWindow();
}
start();

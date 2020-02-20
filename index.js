const { app, BrowserWindow } = require("electron");

function createWindow() {
  const window = new BrowserWindow({
    backgroundColor: "#333333",
    frame: false,
    width: 1024,
    height: 576,
    //width: 800,
    //height: 600,
    //fullscreen: true,
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

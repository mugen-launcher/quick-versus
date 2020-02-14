const { app, BrowserWindow } = require('electron');

function createWindow () {
  let win = new BrowserWindow({
    width: 800,
    height: 600,
    webPreferences: {
      nodeIntegration: true
    }
  });

  win.loadFile('index.html')
}

app.on('window-all-closed', () => {
  app.quit();
});

async function start() {
  await app.whenReady();
  createWindow();
}
start();

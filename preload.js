const { contextBridge, ipcRenderer } = require("electron/renderer");

contextBridge.exposeInMainWorld("mainAPI", {
  execFile: (filePath, args, options, callback) => ipcRenderer.invoke("execFile", filePath, args, options, callback),
  existsSync: (filePath) => ipcRenderer.sendSync("existsSync", filePath),
  readFileSync: (filePath) => ipcRenderer.sendSync("readFileSync", filePath),
  resolve: (...args) => ipcRenderer.sendSync("resolve", args),
  dirname: (filePath) => ipcRenderer.sendSync("dirname", filePath),
  configYaml: (filePath) => ipcRenderer.sendSync("configYaml", filePath),
  getCurrentDirectory: () => { return ipcRenderer.sendSync("getCurrentDirectory"); },
  minimize: () => ipcRenderer.invoke("minimize"),
  restore: () => ipcRenderer.invoke("restore")
});

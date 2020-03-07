import { remote } from "electron";
import isDev from "electron-is-dev";

const { app } = remote;
const path = remote.require("path");

export default function getCurrentDirectory() {
  let currentDirectory;
  if (remote.process.argv.length >= 3) {
    currentDirectory = path.normalize(remote.process.argv[2]);
  } else if (isDev) {
    currentDirectory = path.resolve(app.getAppPath(), "dev-env");
  } else if (remote.process.env.PORTABLE_EXECUTABLE_DIR) {
    currentDirectory = remote.process.env.PORTABLE_EXECUTABLE_DIR;
  } else if (remote.process.env.INIT_CWD) {
    currentDirectory = remote.process.env.INIT_CWD;
  } else if (app.getPath("exe")) {
    currentDirectory = path.dirname(app.getPath("exe"));
  } else if (remote.process.execPath) {
    currentDirectory = remote.process.execPath;
  }
  if (path.basename(currentDirectory) === "MacOS") {
    currentDirectory = path.resolve(currentDirectory, "..", "..", "..");
  }

  return currentDirectory;
}

const React = require("react");
const remote = require("electron").remote;
const app = remote.app;
const fs = remote.require("fs");
const path = remote.require("path");

const currentDirectory = path.dirname(app.getPath("exe"));

module.exports = function App() {
  const files = fs.readdirSync(currentDirectory);
  files.forEach((file, index) => {
    console.log(file);
  });

  const imagePath = `${currentDirectory}/test.png`;
  return <p>coucou {currentDirectory} <img src={imagePath}/></p>;
}

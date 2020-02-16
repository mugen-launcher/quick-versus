const React = require("react");
const { useContext } = React;
const EnvironmentContext = require("./environment.context");

module.exports = function useEnvironment() {
  return useContext(EnvironmentContext);
};

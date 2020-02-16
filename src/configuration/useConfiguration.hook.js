const React = require("react");
const { useContext } = React;
const ConfigurationContext = require("./configuration.context");

module.exports = function useConfiguration() {
  return useContext(ConfigurationContext);
};

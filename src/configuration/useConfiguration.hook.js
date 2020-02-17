import { useContext } from "react";
import ConfigurationContext from "./configuration.context";

export default function useConfiguration() {
  return useContext(ConfigurationContext);
}

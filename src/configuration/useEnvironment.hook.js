import { useContext } from "react";
import EnvironmentContext from "./environment.context";

export default function useEnvironment() {
  return useContext(EnvironmentContext);
}

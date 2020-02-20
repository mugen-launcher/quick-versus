import { useContext } from "react";
import Context from "./navigation.context";

export default function useState() {
  const { state } = useContext(Context);
  return state;
}

import { useContext } from "react";
import Context from "./navigation.context";

export default function useData() {
  const { data } = useContext(Context);
  return data;
}

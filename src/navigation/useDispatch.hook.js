import { useContext } from "react";
import Context from "./navigation.context";

export default function useDispatch() {
  const { dispatch } = useContext(Context);
  return dispatch;
}

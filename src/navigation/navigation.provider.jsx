import React, { useReducer } from "react";
import navigationReducer from "./navigation.reducer";
import navigationInitialState from "./navigation.initialState";
import Context from "./navigation.context";

export default function Provider({ children }) {
  const [state, dispatch] = useReducer(navigationReducer, navigationInitialState);

  return <Context.Provider value={{ data: state, dispatch }}>{children}</Context.Provider>;
}

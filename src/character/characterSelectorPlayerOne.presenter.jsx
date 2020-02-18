import React, { useState, useEffect } from "react";
import useInputPlayerOne from "../input/useInputPlayerOne.hook";
import CharacterSelector from "./characterSelector.presenter";

export default function CharacterSelectorPlayerOne() {
  const input = useInputPlayerOne();

  return <CharacterSelector input={input} />;
}

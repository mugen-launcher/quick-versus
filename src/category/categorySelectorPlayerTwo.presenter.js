import React, { useState, useEffect } from "react";
import useInput from "../input/useInputPlayerTwo.hook";
import CategorySelector from "./categorySelector.presenter";

export default function CategorySelectorPlayerTwo() {
  const input = useInput();

  return <CategorySelector input={input} />;
}

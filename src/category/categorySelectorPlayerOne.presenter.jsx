import React, { useState, useEffect } from "react";
import useInputPlayerOne from "../input/useInputPlayerOne.hook";
import CategorySelector from "./categorySelector.presenter";

export default function CategorySelectorPlayerOne() {
  const input = useInputPlayerOne();

  return <CategorySelector input={input} />;
}

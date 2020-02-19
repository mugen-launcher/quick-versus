import { useState, useEffect } from "react";
import getCharactersMatrix from "../character/getCharactersMatrix";

export default function useCharacterIndex(characters, input) {
  const [selectedIndex, selectIndex] = useState(0);

  useEffect(() => {
    const matrix = getCharactersMatrix(characters);
    let selectedRowIndex = 0;
    let selectedColumnIndex = 0;
    const getSelectedIndexFromMatrix = () => {
      let index = 0;
      for (let rowIndex = 0; rowIndex < matrix.length; rowIndex++) {
        const row = matrix[rowIndex];
        for (let columnIndex = 0; columnIndex < row.length; columnIndex++) {
          if (rowIndex === selectedRowIndex && columnIndex === selectedColumnIndex) {
            return index;
          }
          index++;
        }
      }
      return index;
    };

    const decreaseColumnIndex = () => {
      if (selectedColumnIndex > 0) {
        selectedColumnIndex = selectedColumnIndex - 1;
      } else {
        selectedColumnIndex = matrix[selectedRowIndex].length - 1;
      }
      selectIndex(getSelectedIndexFromMatrix());
    };
    const increaseColumnIndex = () => {
      selectedColumnIndex = (selectedColumnIndex + 1) % matrix[selectedRowIndex].length;
      selectIndex(getSelectedIndexFromMatrix());
    };
    const decreaseRowIndex = () => {
      if (selectedRowIndex > 0) {
        selectedRowIndex = selectedRowIndex - 1;
      } else {
        selectedRowIndex = matrix.length - 1;
      }
      selectIndex(getSelectedIndexFromMatrix());
    };
    const increaseRowIndex = () => {
      selectedRowIndex = (selectedRowIndex + 1) % matrix.length;
      if (selectedColumnIndex >= matrix[selectedRowIndex].length) {
        selectedRowIndex = 0;
      }
      selectIndex(getSelectedIndexFromMatrix());
    };

    input.addEventListener("left", decreaseColumnIndex);
    input.addEventListener("right", increaseColumnIndex);
    input.addEventListener("up", decreaseRowIndex);
    input.addEventListener("down", increaseRowIndex);

    return () => {
      input.removeEventListener("left", decreaseColumnIndex);
      input.removeEventListener("right", increaseColumnIndex);
      input.removeEventListener("up", decreaseRowIndex);
      input.removeEventListener("down", increaseRowIndex);
    };
  }, [input, characters]);

  return selectedIndex;
}

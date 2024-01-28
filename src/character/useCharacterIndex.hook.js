import { useState, useEffect } from "react";
import getCharactersMatrix from "./getCharactersMatrix";
import useCharacterColumns from "../configuration/useCharacterColumns.hook";
import useMoveCursorSound from "../configuration/useMoveCursorSound.hook";
import { DOWN, UP, LEFT, RIGHT } from "../input/event";

export default function useCharacterIndex(characters, input, initialIndex = 0) {
  const moveCursorSound = useMoveCursorSound();
  const columnCount = useCharacterColumns();
  const [selectedIndex, selectIndex] = useState(initialIndex);

  useEffect(() => {
    const newSelectedIndex = initialIndex < characters.length ? initialIndex : 0;
    selectIndex(newSelectedIndex);

    const matrix = getCharactersMatrix(characters, columnCount);
    let selectedRowIndex = 0;
    let selectedColumnIndex = 0;
    let index = 0;
    for (let rowIndex = 0; rowIndex < matrix.length; rowIndex++) {
      const row = matrix[rowIndex];
      for (let columnIndex = 0; columnIndex < row.length; columnIndex++) {
        if (index === newSelectedIndex) {
          selectedRowIndex = rowIndex;
          selectedColumnIndex = columnIndex;
        }
        index++;
      }
    }

    const getSelectedIndexFromMatrix = () => {
      let selectedIndexFromMatrix = 0;
      for (let rowIndex = 0; rowIndex < matrix.length; rowIndex++) {
        const row = matrix[rowIndex];
        for (let columnIndex = 0; columnIndex < row.length; columnIndex++) {
          if (rowIndex === selectedRowIndex && columnIndex === selectedColumnIndex) {
            return selectedIndexFromMatrix;
          }
          selectedIndexFromMatrix++;
        }
      }
      return selectedIndexFromMatrix;
    };

    const decreaseColumnIndex = () => {
      if (selectedColumnIndex > 0) {
        selectedColumnIndex -= 1;
      } else {
        selectedColumnIndex = matrix[selectedRowIndex].length - 1;
      }
      selectIndex(getSelectedIndexFromMatrix());
      moveCursorSound.play();
    };
    const increaseColumnIndex = () => {
      selectedColumnIndex = (selectedColumnIndex + 1) % matrix[selectedRowIndex].length;
      selectIndex(getSelectedIndexFromMatrix());
      moveCursorSound.play();
    };
    const decreaseRowIndex = () => {
      if (selectedRowIndex > 0) {
        selectedRowIndex -= 1;
      } else {
        for (let rowIndex = matrix.length - 1; rowIndex >= 0; rowIndex--) {
          if (selectedColumnIndex < matrix[rowIndex].length) {
            selectedRowIndex = rowIndex;
            break;
          }
        }
      }

      selectIndex(getSelectedIndexFromMatrix());
      moveCursorSound.play();
    };
    const increaseRowIndex = () => {
      selectedRowIndex = (selectedRowIndex + 1) % matrix.length;
      if (selectedColumnIndex >= matrix[selectedRowIndex].length) {
        selectedRowIndex = 0;
      }
      selectIndex(getSelectedIndexFromMatrix());
      moveCursorSound.play();
    };

    input.addEventListener(LEFT, decreaseColumnIndex);
    input.addEventListener(RIGHT, increaseColumnIndex);
    input.addEventListener(UP, decreaseRowIndex);
    input.addEventListener(DOWN, increaseRowIndex);

    return () => {
      input.removeEventListener(LEFT, decreaseColumnIndex);
      input.removeEventListener(RIGHT, increaseColumnIndex);
      input.removeEventListener(UP, decreaseRowIndex);
      input.removeEventListener(DOWN, increaseRowIndex);
    };
  }, [input, characters, columnCount, initialIndex, moveCursorSound]);

  return selectedIndex;
}

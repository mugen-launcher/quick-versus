import React from "react";
import styled, { keyframes } from "styled-components";
import getCharactersMatrix from "./getCharactersMatrix";
import useCharacterColumns from "../configuration/useCharacterColumns.hook";
import thumbnailPlaceholder from "../assets/character-thumbnail-placeholder.png";
import useCharacterThumbnail from "./useCharacterThumbnail.hook";
import useCharacterStyleNames from "../character/useCharacterStyleNames.hook";

const Grid = styled.section`
  z-index: 1;
  position: relative;
  display: grid;
  grid-template-columns: repeat(${props => props.column}, 7vh);
  grid-template-rows: auto;
  grid-column-gap: 0.7vh;
  grid-row-gap: 0.7vh;
  margin-top: ${props => -props.offsetY}vh;
`;
const Cell = styled.article`
  position: relative;
  border: solid 3px #fff;
  width: 7vh;
  height: 7vh;
  background: rgba(0, 0, 0, 0.5);
`;
const StyleCount = styled.span`
  position: absolute;
  z-index: 2;
  color: #000;
  background: #fff;
  border-radius: 100%;
  right: -1vh;
  bottom: -1vh;
  font-family: Ubuntu;
  font-size: 2vh;
  padding: .2em .4em;
`;
const Thumbnail = styled.img`
  z-index: 1;
  width: 100%;
  height: 100%;
  object-fit: cover;
`;

const grow = keyframes`
  0% {
    width: 7vh;
    height: 7vh;
    transform: translateX(0) translateY(0);
  }

  50% {
    width: 9vh;
    height: 9vh;
    transform: translateX(-1vh) translateY(-1vh);
  }

  100% {
    width: 7vh;
    height: 7vh;
    transform: translateX(0) translateY(0);
  }
`;
const Cursor = styled.div`
  z-index: 3;
  position: absolute;
  border: solid 5px #f00;
  width: 7vh;
  height: 7vh;
  animation: ${grow} 1s ease-in-out infinite;
  box-shadow: 0 0 0.2vh 0.2vh #000, inset 0 0 0.2vh 0.2vh #000;
  grid-row-start: ${props => props.row};
  grid-row-end: ${props => props.row};
  grid-column-start: ${props => props.column};
  grid-column-end: ${props => props.column};
`;

export default function CharacterSelector({ characters, selectedCharacter }) {
  const columnCount = useCharacterColumns();
  const matrix = getCharactersMatrix(characters, columnCount);

  const cells = [];
  let selectionRow = 1;
  let selectionColumn = 1;
  for (let rowIndex = 0; rowIndex < matrix.length; rowIndex++) {
    const row = matrix[rowIndex];
    for (let columnIndex = 0; columnIndex < row.length; columnIndex++) {
      const character = row[columnIndex];

      const styleNames = useCharacterStyleNames(character); // eslint-disable-line
      let imagePath = useCharacterThumbnail(character); // eslint-disable-line
      if (!imagePath) {
        imagePath = thumbnailPlaceholder;
      }

      cells.push(
        <Cell key={`${rowIndex}-${columnIndex}-${imagePath}`}>
          <Thumbnail src={imagePath} />
          {styleNames.length > 1 && <StyleCount>{styleNames.length}</StyleCount>}
        </Cell>
      );

      if (character === selectedCharacter) {
        selectionRow = rowIndex + 1;
        selectionColumn = columnIndex + 1;
      }
    }
  }

  const gridY = 12; // zone top + category height
  const cellHeight = 7;
  const cellGap = 0.7;
  const threshold = 90;
  const estimatedCellY = gridY + (cellHeight + cellGap) * selectionRow;
  let offsetY = 0;
  if (estimatedCellY > threshold) {
    offsetY = Math.ceil((estimatedCellY - threshold) / (cellHeight + cellGap)) * (cellHeight + cellGap);
  }
  return (
    <Grid column={columnCount} offsetY={offsetY}>
      {cells}
      <Cursor row={selectionRow} column={selectionColumn} />
    </Grid>
  );
}

import React from "react";
import { remote } from "electron";
import styled from "styled-components";
import getCharactersMatrix from "../character/getCharactersMatrix";
import useEnvironment from "../configuration/useEnvironment.hook";
import useCharacterColumns from "../configuration/useCharacterColumns.hook";
import thumbnailPlaceholder from "../assets/character-thumbnail-placeholder.png";
import useCharacterThumbnail from "./useCharacterThumbnail.hook";
const fs = remote.require("fs");
const path = remote.require("path");

const Grid = styled.section`
  position: relative;
  display: grid;
  grid-template-columns: repeat(${props => props.column}, 7vh);
  grid-template-rows: auto;
  grid-column-gap: .7vh;
  grid-row-gap: .7vh;
`;
const Cell = styled.article`
  border: solid 3px #fff;
  width: 7vh;
  height: 7vh;
`;
const Thumbnail = styled.img`
  width: 100%;
  height: 100%;
  object-fit: cover;
`;
const Selection = styled.div`
  position: absolute;
  border: solid 3px #f00;
  box-shadow: 0 0 0 3px #f00;
  width: 7vh;
  height: 7vh;
  grid-row-start: ${props => props.row};
  grid-row-end: ${props => props.row};
  grid-column-start: ${props => props.column};
  grid-column-end: ${props => props.column};
`;

export default function CharacterSelector({ characters, selectedCharacter }) {
  const environment = useEnvironment();
  const columnCount = useCharacterColumns();
  const matrix = getCharactersMatrix(characters, columnCount);

  const cells = [];
  let selectionRow = 1;
  let selectionColumn = 1;
  for (let rowIndex = 0; rowIndex < matrix.length; rowIndex++) {
    const row = matrix[rowIndex];
    for (let columnIndex = 0; columnIndex < row.length; columnIndex++) {
      const character = row[columnIndex];

      let imagePath = useCharacterThumbnail(character);
      if (!imagePath) {
        imagePath = thumbnailPlaceholder;
      }

      cells.push(<Cell><Thumbnail src={imagePath}/></Cell>);

      if (character === selectedCharacter) {
        selectionRow = rowIndex + 1;
        selectionColumn = columnIndex + 1;
      }
    }
  }

  return (
    <Grid column={columnCount}>
      {cells}
      <Selection row={selectionRow} column={selectionColumn} />
    </Grid>
  );
}

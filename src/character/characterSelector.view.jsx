import React from "react";
import { remote } from "electron";
import styled from "styled-components";
import getCharactersMatrix from "../character/getCharactersMatrix";
import useEnvironment from "../configuration/useEnvironment.hook";
import thumbnailPlaceholder from "../assets/character-thumbnail-placeholder.png";
const fs = remote.require("fs");
const path = remote.require("path");

const Grid = styled.section`
  position: relative;
  display: grid;
  grid-template-columns: repeat(4, 5vw);
  grid-template-rows: auto;
  grid-column-gap: .5vw;
  grid-row-gap: .5vw;
`;
const Cell = styled.article`
  border: solid 3px #fff;
  width: 5vw;
  height: 5vw;
`;
const Thumbnail = styled.img`
  width: 100%;
  height: 100%;
`;
const Selection = styled.div`
  position: absolute;
  border: solid 3px #f00;
  box-shadow: 0 0 0 3px #f00;
  width: 5vw;
  height: 5vw;
  grid-row-start: ${props => props.row};
  grid-row-end: ${props => props.row};
  grid-column-start: ${props => props.column};
  grid-column-end: ${props => props.column};
`;

export default function CharacterSelector({ characters, selectedCharacter }) {
  const environment = useEnvironment();
  const matrix = getCharactersMatrix(characters);

  const cells = [];
  let selectionRow = 1;
  let selectionColumn = 1;
  for (let rowIndex = 0; rowIndex < matrix.length; rowIndex++) {
    const row = matrix[rowIndex];
    for (let columnIndex = 0; columnIndex < row.length; columnIndex++) {
      const character = row[columnIndex];

      let imagePath = thumbnailPlaceholder;
      if (character && character.thumbnail) {
        const thumbnailPath = path.resolve(environment.currentDirectory, character.thumbnail);
        if (fs.existsSync(thumbnailPath)) {
          imagePath = thumbnailPath;
        }
      }
      cells.push(<Cell><Thumbnail src={imagePath}/></Cell>);

      if (character === selectedCharacter) {
        selectionRow = rowIndex + 1;
        selectionColumn = columnIndex + 1;
      }
    }
  }

  return (
    <Grid>
      {cells}
      <Selection row={selectionRow} column={selectionColumn} />
    </Grid>
  );
}

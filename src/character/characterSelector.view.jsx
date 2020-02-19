import React from "react";
import { remote } from "electron";
import styled from "styled-components";
import useEnvironment from "../configuration/useEnvironment.hook";
import thumbnailPlaceholder from "../assets/character-thumbnail-placeholder.png";
const fs = remote.require("fs");
const path = remote.require("path");

const Grid = styled.section`
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

export default function CharacterSelector({ characters, selectedIndex }) {
  const environment = useEnvironment();


  const cells = characters.map(character => {
    let imagePath = thumbnailPlaceholder;
    if (character && character.thumbnail) {
      const thumbnailPath = path.resolve(environment.currentDirectory, character.thumbnail);
      if (fs.existsSync(thumbnailPath)) {
        imagePath = thumbnailPath;
      }
    }
    return <Cell><Thumbnail src={imagePath}/></Cell>
  });

  return <Grid>{cells}</Grid>;
}

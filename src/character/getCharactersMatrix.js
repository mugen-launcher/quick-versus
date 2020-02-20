const maxColumn = 2;

export default function getCharactersMatrix(characters) {
  const rows = [];
  for (let index = 0; index < characters.length; index++) {
    const character = characters[index];
    const characterRow = Math.floor(index / maxColumn);
    const characterColumn = index % maxColumn;

    if (!rows[characterRow]) {
      rows[characterRow] = [];
    }

    rows[characterRow][characterColumn] = character;
  }

  return rows;
}

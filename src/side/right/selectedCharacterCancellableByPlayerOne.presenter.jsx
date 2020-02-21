import React, { useEffect } from "react";
import useInput from "../../input/useInputPlayerOne.hook";
import useCharacterName from "../../character/useCharacterName.hook";
import useNavigationDispatch from "../../navigation/useDispatch.hook";
import unselectCharacterTwo from "../../navigation/action/unselectCharacterTwo.action";
import Portrait from "./portrait.view";
import CharacterName from "./characterName.view";
import Type from "./type.view";

export default function SelectedCharacterCancellableByPlayerOne({ character }) {
  const dispatch = useNavigationDispatch();
  const input = useInput();
  const characterName = useCharacterName(character);

  useEffect(() => {
    const onCancel = () => {
      dispatch(unselectCharacterTwo());
    };

    input.addEventListener("b", onCancel);
    input.addEventListener("escape", onCancel);

    return () => {
      input.removeEventListener("b", onCancel);
      input.removeEventListener("escape", onCancel);
    };
  }, [input]);

  return (
    <>
      <Portrait character={character}/>
      <CharacterName>{characterName}</CharacterName>
      <Type>Computer</Type>
    </>
  );
}

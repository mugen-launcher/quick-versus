import React, { useEffect } from "react";
import useInput from "../../input/useInputPlayerTwo.hook";
import useCharacterName from "../../character/useCharacterName.hook";
import useNavigationDispatch from "../../navigation/useDispatch.hook";
import useCancelSound from "../../configuration/useCancelSound.hook";
import unselectCharacterTwo from "../../navigation/action/unselectCharacterTwo.action";
import Portrait from "./portrait.view";
import StandAnimation from "./standAnimation.view";
import CharacterName from "./characterName.view";
import Type from "./type.view";

export default function SelectedCharacterCancellableByPlayerTwo({ character }) {
  const dispatch = useNavigationDispatch();
  const input = useInput();
  const characterName = useCharacterName(character);
  const cancelSound = useCancelSound();

  useEffect(() => {
    const onCancel = () => {
      dispatch(unselectCharacterTwo());
      cancelSound.play();
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
      <StandAnimation character={character}/>
      <CharacterName>{characterName}</CharacterName>
      <Type>Player 2</Type>
    </>
  );
}

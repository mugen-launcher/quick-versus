import React, { useEffect } from "react";
import useInput from "../../input/useInputPlayerOne.hook";
import useCharacterName from "../../character/useCharacterName.hook";
import useNavigationDispatch from "../../navigation/useDispatch.hook";
import useCancelSound from "../../configuration/useCancelSound.hook";
import unselectCharacterOne from "../../navigation/action/unselectCharacterOne.action";
import useColorIndex from "./useColorIndex.hook";
import Portrait from "./portrait.view";
import StandAnimation from "./standAnimation.view";
import CharacterName from "./characterName.view";
import Type from "./type.view";

export default function SelectedCharacterCancellableByPlayerOne({ character }) {
  const dispatch = useNavigationDispatch();
  const input = useInput();
  const characterName = useCharacterName(character);
  const cancelSound = useCancelSound();
  const colorIndex = useColorIndex();

  useEffect(() => {
    const onCancel = () => {
      dispatch(unselectCharacterOne());
      cancelSound.play();
    };

    input.addEventListener("b", onCancel);
    input.addEventListener("escape", onCancel);

    return () => {
      input.removeEventListener("b", onCancel);
      input.removeEventListener("escape", onCancel);
    };
  }, [input, cancelSound, dispatch]);

  return (
    <>
      <Portrait character={character} />
      <StandAnimation character={character} colorIndex={colorIndex} />
      <CharacterName>{characterName}</CharacterName>
      <Type>Player 1</Type>
    </>
  );
}

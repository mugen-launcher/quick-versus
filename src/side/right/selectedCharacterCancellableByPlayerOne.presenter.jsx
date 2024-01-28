import React, { useEffect } from "react";
import useInput from "../../input/useInputPlayerOne.hook";
import { B } from "../../input/event";
import useCharacterName from "../../character/useCharacterName.hook";
import useNavigationDispatch from "../../navigation/useDispatch.hook";
import useCancelSound from "../../configuration/useCancelSound.hook";
import unselectCharacterTwo from "../../navigation/action/unselectCharacterTwo.action";
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
      dispatch(unselectCharacterTwo());
      cancelSound.play();
    };

    input.addEventListener(B, onCancel);

    return () => {
      input.removeEventListener(B, onCancel);
    };
  }, [input, cancelSound, dispatch]);

  return (
    <>
      <Portrait character={character} />
      <StandAnimation character={character} colorIndex={colorIndex} />
      <CharacterName>{characterName}</CharacterName>
      <Type>Computer</Type>
    </>
  );
}

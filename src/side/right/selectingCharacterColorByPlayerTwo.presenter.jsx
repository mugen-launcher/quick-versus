import React, { useEffect } from "react";
import useInput from "../../input/useInputPlayerTwo.hook";
import { A, B } from "../../input/event";
import useCharacterName from "../../character/useCharacterName.hook";
import useCharacterColorCount from "../../character/useCharacterColorCount.hook";
import useCharacterColorIndex from "../../character/useCharacterColorIndex.hook";
import useNavigationDispatch from "../../navigation/useDispatch.hook";
import unselectCharacterTwo from "../../navigation/action/unselectCharacterTwo.action";
import useSelectColorSound from "../../configuration/useSelectColorSound.hook";
import useCancelSound from "../../configuration/useCancelSound.hook";
import useNavigation from "../../navigation/useData.hook";
import selectCharacterTwoColor from "../../navigation/action/selectCharacterTwoColor.action";
import ColorSelector from "../../character/colorSelector.view";
import Portrait from "./portrait.view";
import StandAnimation from "./standAnimation.view";
import CharacterName from "./characterName.view";
import Type from "./type.view";
import Zone from "./zone.view";

export default function SelectingCharacterColorByPlayerTwo({ character }) {
  const navigation = useNavigation();
  const dispatch = useNavigationDispatch();
  const input = useInput();
  const colorSound = useSelectColorSound();
  const cancelSound = useCancelSound();
  const characterName = useCharacterName(character);
  const colorCount = useCharacterColorCount(character);
  const characterColorIndex = useCharacterColorIndex(input, colorCount, navigation.characterTwoColorIndex);

  useEffect(() => {
    const onCancel = () => {
      dispatch(unselectCharacterTwo());
      cancelSound.play();
    };
    const onConfirm = () => {
      dispatch(selectCharacterTwoColor(characterColorIndex));
      colorSound.play();
    };

    input.addEventListener(A, onConfirm);
    input.addEventListener(B, onCancel);

    return () => {
      input.removeEventListener(A, onConfirm);
      input.removeEventListener(B, onCancel);
    };
  }, [input, characterColorIndex, cancelSound, colorSound, dispatch]);

  if (colorCount <= 1) {
    dispatch(selectCharacterTwoColor(1));
    return null;
  }

  return (
    <>
      <Portrait character={character} />
      <Zone>
        <ColorSelector total={colorCount} index={characterColorIndex} />
      </Zone>
      <StandAnimation character={character} colorIndex={characterColorIndex} />
      <CharacterName>{characterName}</CharacterName>
      <Type>Player 2</Type>
    </>
  );
}

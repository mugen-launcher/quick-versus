import React, { useEffect } from "react";
import useInput from "../../input/useInputPlayerOne.hook";
import useCharacterName from "../../character/useCharacterName.hook";
import useCharacterColorCount from "../../character/useCharacterColorCount.hook";
import useCharacterColorIndex from "../../character/useCharacterColorIndex.hook";
import useNavigationDispatch from "../../navigation/useDispatch.hook";
import useSelectColorSound from "../../configuration/useSelectColorSound.hook";
import useCancelSound from "../../configuration/useCancelSound.hook";
import useNavigation from "../../navigation/useData.hook";
import selectCharacterOneColor from "../../navigation/action/selectCharacterOneColor.action";
import unselectCharacterOne from "../../navigation/action/unselectCharacterOne.action";
import switchMode from "../../navigation/action/switchMode.action";
import Zone from "./zone.view";
import ColorSelector from "../../character/colorSelector.view";
import Portrait from "./portrait.view";
import StandAnimation from "./standAnimation.view";
import CharacterName from "./characterName.view";
import Type from "./type.view";

export default function SelectingCharacterColorByPlayerOne({ character }) {
  const navigation = useNavigation();
  const dispatch = useNavigationDispatch();
  const input = useInput();
  const characterName = useCharacterName(character);
  const colorSound = useSelectColorSound();
  const cancelSound = useCancelSound();
  const colorCount = useCharacterColorCount(character);
  const characterColorIndex = useCharacterColorIndex(input, colorCount, navigation.characterOneColorIndex);

  useEffect(() => {
    const onConfirm = () => {
      dispatch(selectCharacterOneColor(characterColorIndex));
      colorSound.play();
    };
    const onCancel = () => {
      dispatch(unselectCharacterOne());
      cancelSound.play();
    };
    const onSwitchMode = () => {
      dispatch(switchMode());
    };

    input.addEventListener("a", onConfirm);
    input.addEventListener("b", onCancel);
    input.addEventListener("escape", onCancel);
    input.addEventListener("z", onSwitchMode);

    return () => {
      input.removeEventListener("a", onConfirm);
      input.removeEventListener("b", onCancel);
      input.removeEventListener("escape", onCancel);
      input.removeEventListener("z", onSwitchMode);
    };
  }, [input, characterColorIndex, cancelSound, colorSound, dispatch]);

  if (colorCount <= 1) {
    dispatch(selectCharacterOneColor(1));
    return null;
  }

  return (
    <>
      <Portrait character={character} />
      <Zone>
        <ColorSelector total={colorCount} index={characterColorIndex} />
      </Zone>
      <StandAnimation character={character} />
      <CharacterName>{characterName}</CharacterName>
      <Type>Player 1</Type>
    </>
  );
}

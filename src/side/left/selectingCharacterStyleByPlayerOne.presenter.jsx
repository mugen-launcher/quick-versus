import React, { useEffect } from "react";
import useInput from "../../input/useInputPlayerOne.hook";
import { A, B, X } from "../../input/event";
import useCharacterName from "../../character/useCharacterName.hook";
import useCharacterStyleNames from "../../character/useCharacterStyleNames.hook";
import useCharacterStyleIndex from "../../character/useCharacterStyleIndex.hook";
import useCharacterStyle from "../../character/useCharacterStyle.hook";
import useNavigationDispatch from "../../navigation/useDispatch.hook";
import useCancelSound from "../../configuration/useCancelSound.hook";
import useSelectStyleSound from "../../configuration/useSelectStyleSound.hook";
import useNavigation from "../../navigation/useData.hook";
import selectCharacterOneStyle from "../../navigation/action/selectCharacterOneStyle.action";
import unselectCharacterOne from "../../navigation/action/unselectCharacterOne.action";
import switchMode from "../../navigation/action/switchMode.action";
import Zone from "./zone.view";
import StyleSelector from "../../character/styleSelector.view";
import Portrait from "./portrait.view";
import StandAnimation from "./standAnimation.view";
import CharacterName from "./characterName.view";
import Type from "./type.view";

export default function SelectingCharacterStyleByPlayerOne({ character }) {
  const navigation = useNavigation();
  const dispatch = useNavigationDispatch();
  const input = useInput();
  const styleSound = useSelectStyleSound();
  const cancelSound = useCancelSound();
  const styleNames = useCharacterStyleNames(character);
  const characterStyleIndex = useCharacterStyleIndex(input, styleNames.length, navigation.characterOneStyleIndex);
  const characterStyle = useCharacterStyle(character, characterStyleIndex);
  const characterName = useCharacterName(characterStyle);

  useEffect(() => {
    const onConfirm = () => {
      dispatch(selectCharacterOneStyle(characterStyleIndex, characterStyle));
      styleSound.play();
    };
    const onCancel = () => {
      dispatch(unselectCharacterOne());
      cancelSound.play();
    };
    const onSwitchMode = () => {
      dispatch(switchMode());
    };

    input.addEventListener(A, onConfirm);
    input.addEventListener(B, onCancel);
    input.addEventListener(X, onSwitchMode);

    return () => {
      input.removeEventListener(A, onConfirm);
      input.removeEventListener(B, onCancel);
      input.removeEventListener(X, onSwitchMode);
    };
  }, [input, characterStyleIndex, cancelSound, characterStyle, dispatch, styleSound]);

  if (styleNames.length <= 1) {
    dispatch(selectCharacterOneStyle(0, character));
    return null;
  }

  return (
    <>
      <Portrait character={characterStyle} />
      <Zone>
        <StyleSelector names={styleNames} index={characterStyleIndex} />
      </Zone>
      <StandAnimation character={characterStyle} />
      <CharacterName>{characterName}</CharacterName>
      <Type>Player 1</Type>
    </>
  );
}

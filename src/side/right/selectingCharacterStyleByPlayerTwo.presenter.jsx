import React, { useEffect } from "react";
import useInput from "../../input/useInputPlayerTwo.hook";
import useCharacterName from "../../character/useCharacterName.hook";
import useCharacterStyleNames from '../../character/useCharacterStyleNames.hook';
import useCharacterStyleIndex from '../../character/useCharacterStyleIndex.hook';
import useCharacterStyle from '../../character/useCharacterStyle.hook';
import useNavigationDispatch from "../../navigation/useDispatch.hook";
import unselectCharacterTwo from "../../navigation/action/unselectCharacterTwo.action";
import useCancelSound from "../../configuration/useCancelSound.hook";
import useNavigation from "../../navigation/useData.hook";
import useSelectStyleSound from "../../configuration/useSelectStyleSound.hook";
import selectCharacterTwoStyle from "../../navigation/action/selectCharacterTwoStyle.action";
import StyleSelector from "../../character/styleSelector.view";
import Portrait from "./portrait.view";
import StandAnimation from "./standAnimation.view";
import CharacterName from "./characterName.view";
import Type from "./type.view";
import Zone from "./zone.view";

export default function SelectingCharacterStyleByPlayerTwo({ character }) {
  const navigation = useNavigation();
  const dispatch = useNavigationDispatch();
  const input = useInput();
  const styleSound = useSelectStyleSound();
  const cancelSound = useCancelSound();
  const styleNames = useCharacterStyleNames(character);
  if (styleNames.length <= 1) {
    dispatch(selectCharacterTwoStyle(0, character));
    return null;
  }
  const characterStyleIndex = useCharacterStyleIndex(input, styleNames.length, navigation.characterTwoStyleIndex);
  const characterStyle = useCharacterStyle(character, characterStyleIndex);
  const characterName = useCharacterName(characterStyle);

  useEffect(() => {
    const onCancel = () => {
      dispatch(unselectCharacterTwo());
      cancelSound.play();
    };
    const onConfirm = () => {
      dispatch(selectCharacterTwoStyle(characterStyleIndex, characterStyle));
      styleSound.play();
    };

    input.addEventListener("a", onConfirm);
    input.addEventListener("b", onCancel);
    input.addEventListener("escape", onCancel);

    return () => {
      input.removeEventListener("a", onConfirm);
      input.removeEventListener("b", onCancel);
      input.removeEventListener("escape", onCancel);
    };
  }, [input, characterStyleIndex]);

  return (
    <>
      <Portrait character={characterStyle}/>
      <Zone>
        <StyleSelector names={styleNames} index={characterStyleIndex} />
      </Zone>
      <StandAnimation character={characterStyle}/>
      <CharacterName>{characterName}</CharacterName>
      <Type>Player 2</Type>
    </>
  );
}

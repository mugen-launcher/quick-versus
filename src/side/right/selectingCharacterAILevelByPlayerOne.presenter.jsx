import React, { useEffect } from "react";
import useInput from "../../input/useInputPlayerOne.hook";
import { A, B } from "../../input/event";
import useCharacterName from "../../character/useCharacterName.hook";
import useNavigation from "../../navigation/useData.hook";
import useNavigationDispatch from "../../navigation/useDispatch.hook";
import unselectCharacterTwo from "../../navigation/action/unselectCharacterTwo.action";
import useCancelSound from "../../configuration/useCancelSound.hook";
import useSelectAILevelSound from "../../configuration/useSelectAILevelSound.hook";
import selectCharacterTwoAILevel from "../../navigation/action/selectCharacterTwoAILevel.action";
import useCharacterAILevel from "../../character/useCharacterAILevel.hook";
import AILevelSelector from "../../character/aiLevelSelector.view";
import useColorIndex from "./useColorIndex.hook";
import Portrait from "./portrait.view";
import StandAnimation from "./standAnimation.view";
import CharacterName from "./characterName.view";
import Type from "./type.view";
import Zone from "./zone.view";

export default function SelectingCharacterAILevelByPlayerOne({ character }) {
  const navigation = useNavigation();
  const dispatch = useNavigationDispatch();
  const input = useInput();
  const characterName = useCharacterName(character);
  const characterAILevel = useCharacterAILevel(input, navigation.characterTwoAILevel);
  const selectAILevelSound = useSelectAILevelSound();
  const cancelSound = useCancelSound();
  const colorIndex = useColorIndex();

  useEffect(() => {
    const onCancel = () => {
      dispatch(unselectCharacterTwo());
      cancelSound.play();
    };
    const onConfirm = () => {
      dispatch(selectCharacterTwoAILevel(characterAILevel));
      selectAILevelSound.play();
    };

    input.addEventListener(A, onConfirm);
    input.addEventListener(B, onCancel);

    return () => {
      input.removeEventListener(A, onConfirm);
      input.removeEventListener(B, onCancel);
    };
  }, [input, characterAILevel, cancelSound, dispatch, selectAILevelSound]);

  return (
    <>
      <Portrait character={character} />
      <Zone>
        <AILevelSelector level={characterAILevel} />
      </Zone>
      <StandAnimation character={character} colorIndex={colorIndex} />
      <CharacterName>{characterName}</CharacterName>
      <Type>Computer</Type>
    </>
  );
}

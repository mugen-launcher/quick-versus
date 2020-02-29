import React, { useEffect } from "react";
import useInput from "../../input/useInputPlayerOne.hook";
import useCharacterName from "../../character/useCharacterName.hook";
import useNavigation from "../../navigation/useData.hook";
import useNavigationDispatch from "../../navigation/useDispatch.hook";
import unselectCharacterTwo from "../../navigation/action/unselectCharacterTwo.action";
import selectCharacterTwoAILevel from "../../navigation/action/selectCharacterTwoAILevel.action";
import useCharacterAILevel from "../../character/useCharacterAILevel.hook";
import AILevelSelector from "../../character/aiLevelSelector.view";
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

  useEffect(() => {
    const onCancel = () => {
      dispatch(unselectCharacterTwo());
    };
    const onConfirm = () => {
      dispatch(selectCharacterTwoAILevel(characterAILevel));
    };

    input.addEventListener("a", onConfirm);
    input.addEventListener("b", onCancel);
    input.addEventListener("escape", onCancel);

    return () => {
      input.removeEventListener("a", onConfirm);
      input.removeEventListener("b", onCancel);
      input.removeEventListener("escape", onCancel);
    };
  }, [input, characterAILevel]);

  return (
    <>
      <Portrait character={character}/>
      <Zone>
        <AILevelSelector level={characterAILevel} />
      </Zone>
      <StandAnimation character={character}/>
      <CharacterName>{characterName}</CharacterName>
      <Type>Computer</Type>
    </>
  );
}

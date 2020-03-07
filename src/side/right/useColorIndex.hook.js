import useNavigation from "../../navigation/useData.hook";

export default function useColorIndex() {
  const navigation = useNavigation();

  if (navigation.characterTwoColorIndex) {
    return navigation.characterTwoColorIndex;
  }

  return 1;
}

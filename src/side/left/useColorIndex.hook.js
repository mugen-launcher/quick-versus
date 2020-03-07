import useNavigation from "../../navigation/useData.hook";

export default function useColorIndex() {
  const navigation = useNavigation();

  if (navigation.characterOneColorIndex) {
    return navigation.characterOneColorIndex;
  }

  return 1;
}

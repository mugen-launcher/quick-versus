import { renderHook } from "@testing-library/react-hooks";
import useRandomCharacter from "../useRandomCharacter.hook";
import getRandomCharacter from "../util/getRandomCharacter";

jest.mock("../util/getRandomCharacter");

describe("useRandomCharacter()", () => {
  const characterA = { definition: "A" };
  const characterB = { definition: "B" };
  const characterC = { definition: "C" };
  const characterD = { definition: "D" };
  const characterE = { definition: "E" };
  const characterF = { definition: "F" };
  const characterG = { definition: "G" };
  const characterH = {
    definition: "H",
    styles: [characterG]
  };
  const categories = [
    {
      characters: [characterA, characterB, characterC]
    },
    {
      characters: [characterD]
    },
    {
      characters: [characterE, characterF]
    }
  ];
  const categoriesWithSubCharacters = [
    {
      characters: [characterE, characterF, characterH]
    }
  ];

  beforeEach(() => {
    jest.resetAllMocks();
  });

  it("should return a random character", () => {
    getRandomCharacter.mockReturnValue(characterB);

    const { result } = renderHook(() => useRandomCharacter(categories, true));
    const character = result.current;
    expect(getRandomCharacter).toHaveBeenCalledWith([
      characterA,
      characterB,
      characterC,
      characterD,
      characterE,
      characterF
    ]);
    expect(character).toBe(characterB);
  });

  it("should return a random character including sub characters", () => {
    getRandomCharacter.mockReturnValue(characterG);

    const { result } = renderHook(() => useRandomCharacter(categoriesWithSubCharacters, true));
    const character = result.current;
    expect(getRandomCharacter).toHaveBeenCalledWith([characterE, characterF, characterH, characterG]);
    expect(character).toBe(characterG);
  });

  it("should return null if disabled", () => {
    getRandomCharacter.mockReturnValue(characterB);

    const { result } = renderHook(() => useRandomCharacter(categories, false));
    const character = result.current;
    expect(character).toBeUndefined();
  });
});

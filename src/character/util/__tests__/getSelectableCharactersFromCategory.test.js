import getSelectableCharactersFromCategory from "../getSelectableCharactersFromCategory";

describe("getSelectableCharactersFromCategory()", () => {
  const characterA = { definition: "A" };
  const characterB = { definition: "B" };
  const characterC = { definition: "C" };
  const characterD = { definition: "D" };
  const characterE = {
    definition: "E",
    styles: [characterD]
  };

  it("should return all characters", () => {
    const category = {
      characters: [characterA, characterB, characterC]
    };
    const characters = getSelectableCharactersFromCategory(category);
    expect(characters).toEqual([characterA, characterB, characterC]);
  });

  it("should return all characters including sub characters", () => {
    const category = {
      characters: [characterA, characterB, characterE]
    };
    const characters = getSelectableCharactersFromCategory(category);
    expect(characters).toEqual([characterA, characterB, characterE, characterD]);
  });
});

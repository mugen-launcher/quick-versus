import { remote } from "electron";
import useCharacterDefinition from "../useCharacterDefinition.hook";
import useEnvironment from "../../configuration/useEnvironment.hook";

jest.mock("../../configuration/useEnvironment.hook");

describe("useCharacterDefinition()", () => {
  useEnvironment.mockReturnValue({
    currentDirectory: ""
  });

  it("should return null if the provided character is null", () => {
    expect(useCharacterDefinition(null)).toBeNull();
  });

  it("should return null if the provided character is a random character", () => {
    const character = {
      random: true
    };
    expect(useCharacterDefinition(character)).toBeNull();
  });

  it("should return null if the provided character does not have definition", () => {
    const character = {};
    expect(useCharacterDefinition(character)).toBeNull();
  });

  it("should return null if the definition file does not exists", () => {
    remote.require.mockReturnValue({
      resolve: jest.fn(),
      existsSync: jest.fn().mockReturnValue(false)
    });

    const character = {
      definition: "noFound.def"
    };
    expect(useCharacterDefinition(character)).toBeNull();
  });

  it("should return the definition", () => {
    remote.require.mockReturnValue({
      resolve: jest.fn(),
      existsSync: jest.fn().mockReturnValue(true),
      readFileSync: jest.fn().mockReturnValue(`foo = bar`)
    });

    const character = {
      definition: "definition.def"
    };
    expect(useCharacterDefinition(character)).toEqual({
      foo: "bar"
    });
  });
});

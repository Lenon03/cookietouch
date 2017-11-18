import CharacterBaseInformations from "@protocol/network/types/CharacterBaseInformations";
import CharacterToRecolorInformation from "@protocol/network/types/CharacterToRecolorInformation";
import CharacterToRelookInformation from "@protocol/network/types/CharacterToRelookInformation";
import CharactersListMessage from "./CharactersListMessage";
export default class CharactersListWithModificationsMessage extends CharactersListMessage {
  public charactersToRecolor: CharacterToRecolorInformation[];
  public charactersToRename: number[];
  public unusableCharacters: number[];
  public charactersToRelook: CharacterToRelookInformation[];
  constructor(hasStartupActions = false, characters: CharacterBaseInformations[],
              charactersToRecolor: CharacterToRecolorInformation[], charactersToRename: number[],
              unusableCharacters: number[], charactersToRelook: CharacterToRelookInformation[]) {
    super(hasStartupActions, characters);
    this.charactersToRecolor = charactersToRecolor;
    this.charactersToRename = charactersToRename;
    this.unusableCharacters = unusableCharacters;
    this.charactersToRelook = charactersToRelook;

  }
}

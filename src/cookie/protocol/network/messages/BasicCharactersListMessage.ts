import CharacterBaseInformations from "@protocol/network/types/CharacterBaseInformations";
import Message from "./Message";

export default class BasicCharactersListMessage extends Message {
  public characters: CharacterBaseInformations[];

  constructor(characters: CharacterBaseInformations[]) {
    super();
    this.characters = characters;

  }
}

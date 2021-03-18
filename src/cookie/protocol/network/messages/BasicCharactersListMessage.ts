import Message from "@/protocol/network/messages/Message";
import CharacterBaseInformations from "@/protocol/network/types/CharacterBaseInformations";

export default class BasicCharactersListMessage extends Message {
  public characters: CharacterBaseInformations[];

  constructor(characters: CharacterBaseInformations[]) {
    super();
    this.characters = characters;
  }
}

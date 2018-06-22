import CharacterBaseInformations from "@/protocol/network/types/CharacterBaseInformations";
import Message from "@/protocol/network/messages/Message";

export default class BasicCharactersListMessage extends Message {
  public characters: CharacterBaseInformations[];

  constructor(characters: CharacterBaseInformations[]) {
    super();
    this.characters = characters;

  }
}

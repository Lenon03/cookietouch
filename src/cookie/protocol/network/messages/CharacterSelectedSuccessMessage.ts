import CharacterBaseInformations from "@/protocol/network/types/CharacterBaseInformations";
import Message from "@/protocol/network/messages/Message";

export default class CharacterSelectedSuccessMessage extends Message {
  public infos: CharacterBaseInformations;

  constructor(infos: CharacterBaseInformations) {
    super();
    this.infos = infos;

  }
}

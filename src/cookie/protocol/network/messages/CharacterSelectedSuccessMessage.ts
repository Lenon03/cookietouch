import Message from "@/protocol/network/messages/Message";
import CharacterBaseInformations from "@/protocol/network/types/CharacterBaseInformations";

export default class CharacterSelectedSuccessMessage extends Message {
  public infos: CharacterBaseInformations;

  constructor(infos: CharacterBaseInformations) {
    super();
    this.infos = infos;

  }
}

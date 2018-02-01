import CharacterBaseInformations from "@protocol/network/types/CharacterBaseInformations";
import Message from "./Message";

export default class CharacterSelectedSuccessMessage extends Message {
  public infos: CharacterBaseInformations;

  constructor(infos: CharacterBaseInformations) {
    super();
    this.infos = infos;

  }
}

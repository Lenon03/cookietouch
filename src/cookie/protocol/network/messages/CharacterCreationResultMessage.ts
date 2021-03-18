import Message from "@/protocol/network/messages/Message";

export default class CharacterCreationResultMessage extends Message {
  public result: number;

  constructor(result = 1) {
    super();
    this.result = result;

  }
}

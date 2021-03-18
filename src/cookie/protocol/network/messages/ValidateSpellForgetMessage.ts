import Message from "@/protocol/network/messages/Message";

export default class ValidateSpellForgetMessage extends Message {
  public spellId: number;

  constructor(spellId = 0) {
    super();
    this.spellId = spellId;

  }
}

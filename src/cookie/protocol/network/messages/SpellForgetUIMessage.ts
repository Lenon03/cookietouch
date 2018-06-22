import Message from "@/protocol/network/messages/Message";

export default class SpellForgetUIMessage extends Message {
  public open: boolean;

  constructor(open = false) {
    super();
    this.open = open;

  }
}

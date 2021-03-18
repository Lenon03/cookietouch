import Message from "@/protocol/network/messages/Message";

export default class GameActionAcknowledgementMessage extends Message {
  public valid: boolean;
  public actionId: number;

  constructor(valid = false, actionId = 0) {
    super();
    this.valid = valid;
    this.actionId = actionId;

  }
}

import Message from "@/protocol/network/messages/Message";

export default class ExchangeStartOkMulticraftCrafterMessage extends Message {
  public maxCase: number;
  public skillId: number;

  constructor(maxCase = 0, skillId = 0) {
    super();
    this.maxCase = maxCase;
    this.skillId = skillId;

  }
}

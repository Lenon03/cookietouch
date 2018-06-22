import ExchangeStartOkCraftMessage from "@/protocol/network/messages/ExchangeStartOkCraftMessage";

export default class ExchangeStartOkCraftWithInformationMessage extends ExchangeStartOkCraftMessage {
  public nbCase: number;
  public skillId: number;

  constructor(nbCase = 0, skillId = 0) {
    super();
    this.nbCase = nbCase;
    this.skillId = skillId;

  }
}

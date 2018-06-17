import Message from "./Message";

export default class ExchangeStartOkMulticraftCustomerMessage extends Message {
  public maxCase: number;
  public skillId: number;
  public crafterJobLevel: number;

  constructor(maxCase = 0, skillId = 0, crafterJobLevel = 0) {
    super();
    this.maxCase = maxCase;
    this.skillId = skillId;
    this.crafterJobLevel = crafterJobLevel;

  }
}

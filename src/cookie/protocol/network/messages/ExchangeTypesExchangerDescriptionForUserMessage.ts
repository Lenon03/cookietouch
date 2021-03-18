import Message from "@/protocol/network/messages/Message";

export default class ExchangeTypesExchangerDescriptionForUserMessage extends Message {
  public typeDescription: number[];

  constructor(typeDescription: number[]) {
    super();
    this.typeDescription = typeDescription;

  }
}

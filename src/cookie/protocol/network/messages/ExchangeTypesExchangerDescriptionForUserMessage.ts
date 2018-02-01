import Message from "./Message";

export default class ExchangeTypesExchangerDescriptionForUserMessage extends Message {
  public typeDescription: number[];

  constructor(typeDescription: number[]) {
    super();
    this.typeDescription = typeDescription;

  }
}

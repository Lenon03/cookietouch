import Message from "./Message";

export default class ExchangeRequestOnTaxCollectorMessage extends Message {
  public taxCollectorId: number;

  constructor(taxCollectorId = 0) {
    super();
    this.taxCollectorId = taxCollectorId;

  }
}

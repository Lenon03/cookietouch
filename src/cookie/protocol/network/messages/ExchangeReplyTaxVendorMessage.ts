import Message from "./Message";

export default class ExchangeReplyTaxVendorMessage extends Message {
  public objectValue: number;
  public totalTaxValue: number;

  constructor(objectValue = 0, totalTaxValue = 0) {
    super();
    this.objectValue = objectValue;
    this.totalTaxValue = totalTaxValue;

  }
}

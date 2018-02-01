import Message from "./Message";

export default class PaddockSellBuyDialogMessage extends Message {
  public bsell: boolean;
  public ownerId: number;
  public price: number;

  constructor(bsell = false, ownerId = 0, price = 0) {
    super();
    this.bsell = bsell;
    this.ownerId = ownerId;
    this.price = price;

  }
}

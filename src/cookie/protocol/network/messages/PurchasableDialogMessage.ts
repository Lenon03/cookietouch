import Message from "@/protocol/network/messages/Message";

export default class PurchasableDialogMessage extends Message {
  public buyOrSell: boolean;
  public purchasableId: number;
  public price: number;

  constructor(buyOrSell = false, purchasableId = 0, price = 0) {
    super();
    this.buyOrSell = buyOrSell;
    this.purchasableId = purchasableId;
    this.price = price;

  }
}

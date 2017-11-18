import Message from "./Message";
export default class ExchangeBidHouseItemRemoveOkMessage extends Message {
public sellerId: number;
constructor(sellerId = 0) {
super();
this.sellerId = sellerId;

}
}

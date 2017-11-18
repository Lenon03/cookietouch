import Message from "./Message";
export default class ExchangeBidPriceMessage extends Message {
public genericId: number;
public averagePrice: number;
constructor(genericId = 0, averagePrice = 0) {
super();
this.genericId = genericId;
this.averagePrice = averagePrice;

}
}

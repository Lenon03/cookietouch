import Message from "./Message";
export default class ExchangeBuyMessage extends Message {
public objectToBuyId: number;
public quantity: number;
constructor(objectToBuyId = 0, quantity = 0) {
super();
this.objectToBuyId = objectToBuyId;
this.quantity = quantity;

}
}

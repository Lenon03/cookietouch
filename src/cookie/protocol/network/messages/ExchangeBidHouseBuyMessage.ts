import Message from "./Message";
export default class ExchangeBidHouseBuyMessage extends Message {
public uid: number;
public qty: number;
public price: number;
constructor(uid = 0, qty = 0, price = 0) {
super();
this.uid = uid;
this.qty = qty;
this.price = price;

}
}

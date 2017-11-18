import Message from "./Message";
export default class HouseSellRequestMessage extends Message {
public amount: number;
constructor(amount = 0) {
super();
this.amount = amount;

}
}

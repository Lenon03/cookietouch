import Message from "./Message";
export default class ExchangeBidHouseBuyResultMessage extends Message {
public uid: number;
public bought: boolean;
constructor(uid = 0, bought = false) {
super();
this.uid = uid;
this.bought = bought;

}
}

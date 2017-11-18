import Message from "./Message";
export default class HouseSoldMessage extends Message {
public houseId: number;
public realPrice: number;
public buyerName: string;
constructor(houseId = 0, realPrice = 0, buyerName = "") {
super();
this.houseId = houseId;
this.realPrice = realPrice;
this.buyerName = buyerName;

}
}

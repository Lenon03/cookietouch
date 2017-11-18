import Message from "./Message";
export default class ExchangeGoldPaymentForCraftMessage extends Message {
public onlySuccess: boolean;
public goldSum: number;
constructor(onlySuccess = false, goldSum = 0) {
super();
this.onlySuccess = onlySuccess;
this.goldSum = goldSum;

}
}

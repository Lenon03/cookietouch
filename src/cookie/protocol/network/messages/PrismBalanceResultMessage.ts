import Message from "./Message";
export default class PrismBalanceResultMessage extends Message {
public totalBalanceValue: number;
public subAreaBalanceValue: number;
constructor(totalBalanceValue = 0, subAreaBalanceValue = 0) {
super();
this.totalBalanceValue = totalBalanceValue;
this.subAreaBalanceValue = subAreaBalanceValue;

}
}

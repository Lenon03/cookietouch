import Message from "./Message";
export default class ExchangeWaitingResultMessage extends Message {
public bwait: boolean;
constructor(bwait = false) {
super();
this.bwait = bwait;

}
}

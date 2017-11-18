import Message from "./Message";
export default class PrismInfoJoinLeaveRequestMessage extends Message {
public join: boolean;
constructor(join = false) {
super();
this.join = join;

}
}

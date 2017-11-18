import Message from "./Message";
export default class PrismFightJoinLeaveRequestMessage extends Message {
public subAreaId: number;
public join: boolean;
constructor(subAreaId = 0, join = false) {
super();
this.subAreaId = subAreaId;
this.join = join;

}
}

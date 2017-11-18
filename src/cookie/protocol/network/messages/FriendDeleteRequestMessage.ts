import Message from "./Message";
export default class FriendDeleteRequestMessage extends Message {
public accountId: number;
constructor(accountId = 0) {
super();
this.accountId = accountId;

}
}

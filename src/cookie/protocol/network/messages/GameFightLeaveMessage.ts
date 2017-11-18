import Message from "./Message";
export default class GameFightLeaveMessage extends Message {
public charId: number;
constructor(charId = 0) {
super();
this.charId = charId;

}
}

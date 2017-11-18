import Message from "./Message";
export default class GuildPaddockRemovedMessage extends Message {
public paddockId: number;
constructor(paddockId = 0) {
super();
this.paddockId = paddockId;

}
}

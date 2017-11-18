import ChatSmileyMessage from "./ChatSmileyMessage";
export default class LocalizedChatSmileyMessage extends ChatSmileyMessage {
public cellId: number;
constructor(entityId = 0, smileyId = 0, accountId = 0, cellId = 0) {
super(entityId, smileyId, accountId );
this.cellId = cellId;

}
}

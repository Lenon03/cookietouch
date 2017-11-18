import ChatAbstractClientMessage from "./ChatAbstractClientMessage";
export default class ChatClientPrivateMessage extends ChatAbstractClientMessage {
public receiver: string;
constructor(content = "", receiver = "") {
super(content );
this.receiver = receiver;

}
}

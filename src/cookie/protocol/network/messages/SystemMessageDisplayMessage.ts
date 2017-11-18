import Message from "./Message";
export default class SystemMessageDisplayMessage extends Message {
public parameters: string[];
public hangUp: boolean;
public msgId: number;
constructor(hangUp = false, msgId = 0, parameters: string[]) {
super();
this.parameters = parameters;
this.hangUp = hangUp;
this.msgId = msgId;

}
}

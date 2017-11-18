import Message from "./Message";
export default class LivingObjectMessageRequestMessage extends Message {
public parameters: string[];
public msgId: number;
public livingObject: number;
constructor(msgId = 0, livingObject = 0, parameters: string[]) {
super();
this.parameters = parameters;
this.msgId = msgId;
this.livingObject = livingObject;

}
}

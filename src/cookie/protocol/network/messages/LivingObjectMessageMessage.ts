import Message from "./Message";

export default class LivingObjectMessageMessage extends Message {
  public msgId: number;
  public timeStamp: number;
  public owner: string;
  public objectGenericId: number;

  constructor(msgId = 0, timeStamp = 0, owner = "", objectGenericId = 0) {
    super();
    this.msgId = msgId;
    this.timeStamp = timeStamp;
    this.owner = owner;
    this.objectGenericId = objectGenericId;

  }
}

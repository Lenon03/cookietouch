import Message from "@/protocol/network/messages/Message";

export default class SystemMessageDisplayMessage extends Message {
  public parameters: string[];
  public hangUp: boolean;
  public msgId: number;
  public text: string;

  constructor(text = "", hangUp = false, msgId = 0, parameters: string[]) {
    super();
    this.text = text;
    this.parameters = parameters;
    this.hangUp = hangUp;
    this.msgId = msgId;
  }
}

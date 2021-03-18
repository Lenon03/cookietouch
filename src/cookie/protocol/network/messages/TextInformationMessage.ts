import Message from "@/protocol/network/messages/Message";

export default class TextInformationMessage extends Message {
  public parameters: string[];
  public msgType: number;
  public msgId: number;
  public text: string;

  constructor(text = "", msgType = 0, msgId = 0, parameters: string[]) {
    super();
    this.text = text;
    this.parameters = parameters;
    this.msgType = msgType;
    this.msgId = msgId;
  }
}

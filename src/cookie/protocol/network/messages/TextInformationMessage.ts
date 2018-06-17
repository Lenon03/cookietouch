import Message from "./Message";

export default class TextInformationMessage extends Message {
  public parameters: string[];
  public msgType: number;
  public msgId: number;
  public _text: string;

  constructor(msgType = 0, msgId = 0, parameters: string[]) {
    super();
    this.parameters = parameters;
    this.msgType = msgType;
    this.msgId = msgId;

  }
}

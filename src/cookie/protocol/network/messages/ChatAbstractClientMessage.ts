import Message from "./Message";

export default class ChatAbstractClientMessage extends Message {
  public content: string;

  constructor(content = "") {
    super();
    this.content = content;

  }
}

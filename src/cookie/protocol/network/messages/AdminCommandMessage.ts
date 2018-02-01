import Message from "./Message";

export default class AdminCommandMessage extends Message {
  public content: string;

  constructor(content = "") {
    super();
    this.content = content;

  }
}

import Message from "./Message";

export default class DebugInClientMessage extends Message {
  public level: number;
  public message: string;

  constructor(level = 0, message = "") {
    super();
    this.level = level;
    this.message = message;

  }
}

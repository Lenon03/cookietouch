import Message from "./Message";

export default class IgnoredAddRequestMessage extends Message {
  public name: string;
  public session: boolean;

  constructor(name = "", session = false) {
    super();
    this.name = name;
    this.session = session;

  }
}

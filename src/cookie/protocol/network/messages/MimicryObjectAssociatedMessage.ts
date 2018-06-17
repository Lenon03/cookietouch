import Message from "./Message";

export default class MimicryObjectAssociatedMessage extends Message {
  public hostUID: number;

  constructor(hostUID = 0) {
    super();
    this.hostUID = hostUID;

  }
}

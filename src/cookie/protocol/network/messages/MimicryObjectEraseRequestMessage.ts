import Message from "./Message";

export default class MimicryObjectEraseRequestMessage extends Message {
  public hostUID: number;
  public hostPos: number;

  constructor(hostUID = 0, hostPos = 0) {
    super();
    this.hostUID = hostUID;
    this.hostPos = hostPos;

  }
}

import Message from "./Message";
export default class MountReleasedMessage extends Message {
  public mountId: number;
  constructor(mountId = 0) {
    super();
    this.mountId = mountId;

  }
}

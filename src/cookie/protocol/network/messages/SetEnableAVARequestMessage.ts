import Message from "./Message";

export default class SetEnableAVARequestMessage extends Message {
  public enable: boolean;

  constructor(enable = false) {
    super();
    this.enable = enable;

  }
}

import Message from "./Message";

export default class JobAllowMultiCraftRequestSetMessage extends Message {
  public enabled: boolean;

  constructor(enabled = false) {
    super();
    this.enabled = enabled;

  }
}

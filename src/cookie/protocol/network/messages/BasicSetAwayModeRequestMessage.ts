import Message from "./Message";

export default class BasicSetAwayModeRequestMessage extends Message {
  public enable: boolean;
  public invisible: boolean;

  constructor(enable = false, invisible = false) {
    super();
    this.enable = enable;
    this.invisible = invisible;

  }
}

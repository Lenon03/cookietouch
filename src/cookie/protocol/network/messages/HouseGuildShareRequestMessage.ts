import Message from "./Message";

export default class HouseGuildShareRequestMessage extends Message {
  public enable: boolean;
  public rights: number;

  constructor(enable = false, rights = 0) {
    super();
    this.enable = enable;
    this.rights = rights;

  }
}

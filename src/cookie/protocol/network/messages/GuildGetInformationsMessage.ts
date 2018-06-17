import Message from "./Message";

export default class GuildGetInformationsMessage extends Message {
  public infoType: number;

  constructor(infoType = 0) {
    super();
    this.infoType = infoType;

  }
}

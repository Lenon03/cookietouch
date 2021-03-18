import Message from "@/protocol/network/messages/Message";

export default class MapFightCountMessage extends Message {
  public fightCount: number;

  constructor(fightCount = 0) {
    super();
    this.fightCount = fightCount;

  }
}

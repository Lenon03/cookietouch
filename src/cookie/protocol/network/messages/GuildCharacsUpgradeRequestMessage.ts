import Message from "./Message";

export default class GuildCharacsUpgradeRequestMessage extends Message {
  public charaTypeTarget: number;

  constructor(charaTypeTarget = 0) {
    super();
    this.charaTypeTarget = charaTypeTarget;

  }
}

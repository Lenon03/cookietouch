import Message from "@/protocol/network/messages/Message";

export default class GuildLevelUpMessage extends Message {
  public newLevel: number;

  constructor(newLevel = 0) {
    super();
    this.newLevel = newLevel;

  }
}

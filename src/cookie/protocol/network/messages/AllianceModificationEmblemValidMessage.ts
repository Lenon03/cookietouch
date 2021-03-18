import Message from "@/protocol/network/messages/Message";
import GuildEmblem from "@/protocol/network/types/GuildEmblem";

export default class AllianceModificationEmblemValidMessage extends Message {
  public alliancemblem: GuildEmblem;

  constructor(alliancemblem = new GuildEmblem()) {
    super();
    this.alliancemblem = alliancemblem;
  }
}

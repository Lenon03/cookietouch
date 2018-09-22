import Message from "@/protocol/network/messages/Message";
import GuildEmblem from "@/protocol/network/types/GuildEmblem";

export default class AllianceModificationValidMessage extends Message {
  public allianceName: string;
  public allianceTag: string;
  public alliancemblem: GuildEmblem;

  constructor(
    allianceName = "",
    allianceTag = "",
    alliancemblem = new GuildEmblem()
  ) {
    super();
    this.allianceName = allianceName;
    this.allianceTag = allianceTag;
    this.alliancemblem = alliancemblem;
  }
}

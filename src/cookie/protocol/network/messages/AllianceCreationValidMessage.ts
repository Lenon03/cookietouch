import Message from "@/protocol/network/messages/Message";
import GuildEmblem from "@/protocol/network/types/GuildEmblem";

export default class AllianceCreationValidMessage extends Message {
  public allianceName: string;
  public allianceTag: string;
  public allianceEmblem: GuildEmblem;

  constructor(allianceName = "", allianceTag = "", allianceEmblem: GuildEmblem) {
    super();
    this.allianceName = allianceName;
    this.allianceTag = allianceTag;
    this.allianceEmblem = allianceEmblem;

  }
}

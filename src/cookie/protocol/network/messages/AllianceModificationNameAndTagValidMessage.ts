import Message from "@/protocol/network/messages/Message";

export default class AllianceModificationNameAndTagValidMessage extends Message {
  public allianceName: string;
  public allianceTag: string;

  constructor(allianceName = "", allianceTag = "") {
    super();
    this.allianceName = allianceName;
    this.allianceTag = allianceTag;

  }
}

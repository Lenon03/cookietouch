import Message from "@/protocol/network/messages/Message";
import AllianceInformations from "@/protocol/network/types/AllianceInformations";

export default class AllianceJoinedMessage extends Message {
  public allianceInfo: AllianceInformations;
  public enabled: boolean;

  constructor(allianceInfo: AllianceInformations = null, enabled = false) {
    super();
    this.allianceInfo = allianceInfo;
    this.enabled = enabled;

  }
}

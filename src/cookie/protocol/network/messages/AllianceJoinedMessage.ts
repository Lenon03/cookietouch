import AllianceInformations from "@protocol/network/types/AllianceInformations";
import Message from "./Message";

export default class AllianceJoinedMessage extends Message {
  public allianceInfo: AllianceInformations;
  public enabled: boolean;

  constructor(allianceInfo: AllianceInformations = null, enabled = false) {
    super();
    this.allianceInfo = allianceInfo;
    this.enabled = enabled;

  }
}

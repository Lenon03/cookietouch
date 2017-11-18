import BasicNamedAllianceInformations from "@protocol/network/types/BasicNamedAllianceInformations";
import Message from "./Message";
export default class AllianceInvitedMessage extends Message {
  public recruterId: number;
  public recruterName: string;
  public allianceInfo: BasicNamedAllianceInformations;
  constructor(recruterId = 0, recruterName = "", allianceInfo: BasicNamedAllianceInformations = null) {
    super();
    this.recruterId = recruterId;
    this.recruterName = recruterName;
    this.allianceInfo = allianceInfo;

  }
}

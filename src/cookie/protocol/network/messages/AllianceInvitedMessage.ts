import Message from "@/protocol/network/messages/Message";
import BasicNamedAllianceInformations from "@/protocol/network/types/BasicNamedAllianceInformations";

export default class AllianceInvitedMessage extends Message {
  public recruterId: number;
  public recruterName: string;
  public allianceInfo: BasicNamedAllianceInformations;

  constructor(
    recruterId = 0,
    recruterName = "",
    allianceInfo = new BasicNamedAllianceInformations()
  ) {
    super();
    this.recruterId = recruterId;
    this.recruterName = recruterName;
    this.allianceInfo = allianceInfo;
  }
}

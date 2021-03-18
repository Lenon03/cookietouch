import AllianceJoinedMessage from "@/protocol/network/messages/AllianceJoinedMessage";
import AllianceInformations from "@/protocol/network/types/AllianceInformations";

export default class AllianceMembershipMessage extends AllianceJoinedMessage {
  constructor(allianceInfo = new AllianceInformations(), enabled = false) {
    super();
  }
}

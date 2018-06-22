import AllianceJoinedMessage from "@/protocol/network/messages/AllianceJoinedMessage";

export default class AllianceMembershipMessage extends AllianceJoinedMessage {
  constructor(allianceInfo: AllianceMembershipMessage = null, enabled = false) {
    super();

  }
}

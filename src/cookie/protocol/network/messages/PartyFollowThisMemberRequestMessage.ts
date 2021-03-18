import PartyFollowMemberRequestMessage from "@/protocol/network/messages/PartyFollowMemberRequestMessage";

export default class PartyFollowThisMemberRequestMessage extends PartyFollowMemberRequestMessage {
  public enabled: boolean;

  constructor(partyId = 0, playerId = 0, enabled = false) {
    super(partyId, playerId);
    this.enabled = enabled;

  }
}

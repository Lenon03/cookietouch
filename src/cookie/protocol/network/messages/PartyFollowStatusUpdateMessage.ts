import AbstractPartyMessage from "./AbstractPartyMessage";

export default class PartyFollowStatusUpdateMessage extends AbstractPartyMessage {
  public success: boolean;
  public followedId: number;

  constructor(partyId = 0, success = false, followedId = 0) {
    super(partyId);
    this.success = success;
    this.followedId = followedId;

  }
}

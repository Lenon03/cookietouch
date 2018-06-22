import AbstractPartyMessage from "@/protocol/network/messages/AbstractPartyMessage";
import PartyMemberGeoPosition from "@/protocol/network/types/PartyMemberGeoPosition";

export default class PartyLocateMembersMessage extends AbstractPartyMessage {
  public geopositions: PartyMemberGeoPosition[];

  constructor(partyId = 0, geopositions: PartyMemberGeoPosition[]) {
    super(partyId);
    this.geopositions = geopositions;

  }
}

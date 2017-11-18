import PartyMemberGeoPosition from "@protocol/network/types/PartyMemberGeoPosition";
import AbstractPartyMessage from "./AbstractPartyMessage";
export default class PartyLocateMembersMessage extends AbstractPartyMessage {
public geopositions: PartyMemberGeoPosition[];
constructor(partyId = 0, geopositions: PartyMemberGeoPosition[]) {
super(partyId );
this.geopositions = geopositions;

}
}

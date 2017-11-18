import AbstractPartyMessage from "./AbstractPartyMessage";
export default class PartyDeletedMessage extends AbstractPartyMessage {
constructor(partyId = 0) {
super(partyId );

}
}

import ContactLookRequestMessage from "./ContactLookRequestMessage";
export default class ContactLookRequestByIdMessage extends ContactLookRequestMessage {
public playerId: number;
constructor(requestId = 0, contactType = 0, playerId = 0) {
super(requestId, contactType );
this.playerId = playerId;

}
}

import IdentificationFailedMessage from "./IdentificationFailedMessage";
export default class IdentificationFailedForBadVersionMessage extends IdentificationFailedMessage {
constructor(reason = 99) {
super(reason );

}
}

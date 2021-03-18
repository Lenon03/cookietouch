import Message from "@/protocol/network/messages/Message";
import IdentifiedEntityDispositionInformations from "@/protocol/network/types/IdentifiedEntityDispositionInformations";

export default class GameEntityDispositionMessage extends Message {
  public disposition: IdentifiedEntityDispositionInformations;

  constructor(disposition: IdentifiedEntityDispositionInformations) {
    super();
    this.disposition = disposition;

  }
}

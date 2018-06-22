import IdentifiedEntityDispositionInformations from "@/protocol/network/types/IdentifiedEntityDispositionInformations";
import Message from "@/protocol/network/messages/Message";

export default class GameEntityDispositionMessage extends Message {
  public disposition: IdentifiedEntityDispositionInformations;

  constructor(disposition: IdentifiedEntityDispositionInformations) {
    super();
    this.disposition = disposition;

  }
}

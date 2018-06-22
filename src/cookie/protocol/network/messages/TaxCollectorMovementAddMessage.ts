import Message from "@/protocol/network/messages/Message";
import TaxCollectorInformations from "@/protocol/network/types/TaxCollectorInformations";

export default class TaxCollectorMovementAddMessage extends Message {
  public informations: TaxCollectorInformations;

  constructor(informations: TaxCollectorInformations) {
    super();
    this.informations = informations;

  }
}

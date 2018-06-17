import TaxCollectorInformations from "@protocol/network/types/TaxCollectorInformations";
import Message from "./Message";

export default class TaxCollectorMovementAddMessage extends Message {
  public informations: TaxCollectorInformations;

  constructor(informations: TaxCollectorInformations) {
    super();
    this.informations = informations;

  }
}

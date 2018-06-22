import Message from "@/protocol/network/messages/Message";
import TaxCollectorFightersInformation from "@/protocol/network/types/TaxCollectorFightersInformation";
import TaxCollectorInformations from "@/protocol/network/types/TaxCollectorInformations";

export default class TaxCollectorListMessage extends Message {
  public informations: TaxCollectorInformations[];
  public fightersInformations: TaxCollectorFightersInformation[];
  public nbcollectorMax: number;

  constructor(nbcollectorMax = 0, informations: TaxCollectorInformations[], fightersInformations: TaxCollectorFightersInformation[]) {
    super();
    this.informations = informations;
    this.fightersInformations = fightersInformations;
    this.nbcollectorMax = nbcollectorMax;

  }
}

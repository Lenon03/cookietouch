import PrismSubAreaInformation from "@protocol/network/types/PrismSubAreaInformation";
import VillageConquestPrismInformation from "@protocol/network/types/VillageConquestPrismInformation";
import Message from "./Message";
export default class PrismWorldInformationMessage extends Message {
  public subAreasInformation: PrismSubAreaInformation[];
  public conquetesInformation: VillageConquestPrismInformation[];
  public nbSubOwned: number;
  public subTotal: number;
  public maxSub: number;
  public nbConqsOwned: number;
  public conqsTotal: number;
  constructor(nbSubOwned = 0, subTotal = 0, maxSub = 0, nbConqsOwned = 0,
              conqsTotal = 0, subAreasInformation: PrismSubAreaInformation[], conquetesInformation: VillageConquestPrismInformation[]) {
    super();
    this.subAreasInformation = subAreasInformation;
    this.conquetesInformation = conquetesInformation;
    this.nbSubOwned = nbSubOwned;
    this.subTotal = subTotal;
    this.maxSub = maxSub;
    this.nbConqsOwned = nbConqsOwned;
    this.conqsTotal = conqsTotal;

  }
}

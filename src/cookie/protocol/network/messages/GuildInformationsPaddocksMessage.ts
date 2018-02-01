import PaddockContentInformations from "@protocol/network/types/PaddockContentInformations";
import Message from "./Message";

export default class GuildInformationsPaddocksMessage extends Message {
  public paddocksInformations: PaddockContentInformations[];
  public nbPaddockMax: number;

  constructor(nbPaddockMax = 0, paddocksInformations: PaddockContentInformations[]) {
    super();
    this.paddocksInformations = paddocksInformations;
    this.nbPaddockMax = nbPaddockMax;

  }
}

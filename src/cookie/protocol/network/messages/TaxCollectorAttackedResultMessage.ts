import BasicGuildInformations from "@protocol/network/types/BasicGuildInformations";
import TaxCollectorBasicInformations from "@protocol/network/types/TaxCollectorBasicInformations";
import Message from "./Message";

export default class TaxCollectorAttackedResultMessage extends Message {
  public deadOrAlive: boolean;
  public basicInfos: TaxCollectorBasicInformations;
  public guild: BasicGuildInformations;

  constructor(deadOrAlive = false, basicInfos: TaxCollectorBasicInformations, guild: BasicGuildInformations) {
    super();
    this.deadOrAlive = deadOrAlive;
    this.basicInfos = basicInfos;
    this.guild = guild;

  }
}

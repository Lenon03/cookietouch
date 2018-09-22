import BasicGuildInformations from "@/protocol/network/types/BasicGuildInformations";
import TaxCollectorComplementaryInformations from "@/protocol/network/types/TaxCollectorComplementaryInformations";

export default class TaxCollectorGuildInformations extends TaxCollectorComplementaryInformations {
  public guild: BasicGuildInformations;

  constructor(guild = new BasicGuildInformations()) {
    super();
    this.guild = guild;
  }
}

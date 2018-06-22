import BasicGuildInformations from "@/protocol/network/types/BasicGuildInformations";
import TaxCollectorComplementaryInformations from "@/protocol/network/types/TaxCollectorComplementaryInformations";

export default class TaxCollectorGuildInformations extends TaxCollectorComplementaryInformations {
  public guild: BasicGuildInformations;

  constructor(guild: BasicGuildInformations = null) {
    super();
    this.guild = guild;

  }
}

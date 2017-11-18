import BasicGuildInformations from "./BasicGuildInformations";
import TaxCollectorComplementaryInformations from "./TaxCollectorComplementaryInformations";
export default class TaxCollectorGuildInformations extends TaxCollectorComplementaryInformations {
  public guild: BasicGuildInformations;
  constructor(guild: BasicGuildInformations = null) {
    super();
    this.guild = guild;

  }
}

import AllianceInformations from "@/protocol/network/types/AllianceInformations";
import HumanOption from "@/protocol/network/types/HumanOption";

export default class HumanOptionAlliance extends HumanOption {
  public allianceInformations: AllianceInformations;
  public aggressable: number;

  constructor(
    allianceInformations = new AllianceInformations(),
    aggressable = 0
  ) {
    super();
    this.allianceInformations = allianceInformations;
    this.aggressable = aggressable;
  }
}

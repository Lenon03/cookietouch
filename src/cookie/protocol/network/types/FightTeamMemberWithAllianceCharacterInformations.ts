import BasicAllianceInformations from "@/protocol/network/types/BasicAllianceInformations";
import FightTeamMemberCharacterInformations from "@/protocol/network/types/FightTeamMemberCharacterInformations";

export default class FightTeamMemberWithAllianceCharacterInformations extends FightTeamMemberCharacterInformations {

  public allianceInfos: BasicAllianceInformations;

  constructor(id = 0, name = "", level = 0, allianceInfos: BasicAllianceInformations) {
    super(id, name, level);
    this.allianceInfos = allianceInfos;
  }
}
